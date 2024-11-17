import os
import time
import subprocess
import logging
import argparse
import hashlib
import json
from functools import lru_cache
import google.generativeai as genai
from string import Template

logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')


CACHE_DIR = ".gemini_cache"  # Directory for file system cache
os.makedirs(CACHE_DIR, exist_ok=True) # Create cache dir if it doesn't exist
# Replace with your actual API key configuration

api_key = os.environ.get("GEMINI_API_KEY")
logging.info(f"API Key Length: {len(api_key) if api_key else 0}") #Log length, not the key itself
genai.configure(api_key=api_key)

model = genai.GenerativeModel(model_name="gemini-1.5-flash") # or your preferred Gemini model

@lru_cache(maxsize=None) #In-memory caching. maxsize=None for unlimited size.
def memoized_gemini_call(rendered_template):
  """Memoized call to Gemini API.  Returns response text."""
  try:
      chat_session = model.start_chat(history=[])
      response = chat_session.send_message(rendered_template)
      return response.text
  except Exception as e:
      logging.error(f"Gemini API call failed: {e}")
      return "" #Return empty string on error




def get_cache_key(rendered_template):
  """Generates a unique cache key based on the rendered template."""
  # Use a hash function to avoid long keys and potential issues with file names
  return hashlib.md5(rendered_template.encode()).hexdigest()


def load_from_cache(cache_key):
  """Loads response from file system cache if available."""
  cache_file = os.path.join(CACHE_DIR, f"{cache_key}.json")
  try:
      with open(cache_file, 'r') as f:
          return json.load(f)["response"]  # Load response text from JSON
  except (FileNotFoundError, json.JSONDecodeError):
      return None

def save_to_cache(cache_key, response_text):
  """Saves response to file system cache."""
  cache_file = os.path.join(CACHE_DIR, f"{cache_key}.json")
  try:
    with open(cache_file, 'w') as f:
      json.dump({"response": response_text}, f)  # Save as JSON
  except Exception as e:
    logging.error(f"Error saving to cache '{cache_file}': {e}")

def render_template(template_str, input_data):
    try:
        template = Template(template_str)
        rendered = template.substitute(input_data)
        if not rendered.strip():  # Check for empty or whitespace-only strings
            raise ValueError("Rendered template is empty or contains only whitespace.")
        return rendered
    except KeyError as e:
        raise ValueError(f"Template placeholder not found: {e}")
    except Exception as e:
        raise RuntimeError(f"Template rendering failed: {e}")


def process_input(input_arg):
    """Processes input (filename or string), reading file contents if needed.  Handles relative paths."""
    current_directory = os.getcwd()  # Get the current working directory
    file_path = os.path.join(current_directory, input_arg) # Construct the absolute path


    logging.info(f"Current working directory: {current_directory}")  # Log the current directory
    logging.info(f"Checking for file: {file_path}")  # Log the file path being checked


    if os.path.exists(file_path):
        with open(file_path, 'r') as f:
            return f.read().strip()
    else:
        return input_arg  # Treat as a literal string

def fill_and_send_to_gemini(template_file, input_files, output_file, use_filesystem_cache=True):
    """Fills template, sends to Gemini (with memoization), writes output."""
    try:
        with open(template_file, 'r') as file:
            template_string = file.read()

        input_data = {}
        for key, value in input_files.items():
            input_data[key] = process_input(value)

        rendered_template = render_template(template_string, input_data)

        logging.info(f"Rendered template:\n{rendered_template}")

        cache_key = get_cache_key(rendered_template)

        cached_response = load_from_cache(cache_key) #Load from filesystem if enabled

        if cached_response:
          logging.info(f"Loaded response from cache (key: {cache_key})")
          response_text = cached_response
        else:
          response_text = memoized_gemini_call(rendered_template) #Call Gemini, memoized in memory
          if use_filesystem_cache:
              save_to_cache(cache_key, response_text) #Save to file system cache

        with open(output_file, 'w') as outfile:
            outfile.write(response_text)
        print(f"Response written to '{output_file}'")

    except Exception as e:
        logging.error(f"An unexpected error occurred: {e}")

