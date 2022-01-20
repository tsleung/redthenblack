
enum CacheType {
  SmallSizeHighLatencyOnline,
  HighLatencyOffline
}
interface CacheEntry {
  type: CacheType
}

export function localCache() {
  return {
    getItem: (key: string) => {
      return window.localStorage.getItem(key);
    },
    setItem: (key: string, value: string) => {
      try{ 
        window.localStorage.setItem(key, value);
      } catch (e) {
        window.localStorage.clear();
      }  
    }
  }
}

// Create promise memoize, saves promise contents if successful and returns

export function memoizePromiseLocalStorage<T>(key, resolver: () => Promise<T>) {
  const localItem = localCache().getItem(key);
  return (localItem != null) ?
    Promise.resolve(JSON.parse(localItem) as T) :
    resolver().then(ret => {
      localCache().setItem(key, JSON.stringify(ret));
      return ret;
    });
}


const IN_MEMORY_CACHE = {};
export function memoizePromiseInMemory<T>(key, resolver: () => Promise<T>) {
  const localItem = IN_MEMORY_CACHE[key];
  return (localItem != null) ?
    Promise.resolve(JSON.parse(localItem) as T) :
    resolver().then(ret => {
      IN_MEMORY_CACHE[key] = JSON.stringify(ret);
      return ret;
    });
}

/**
 * Retrieves an item from local storage based on key, or if not present, resolves the value and puts
 * 
 * @param key 
 * @param resolver 
 * @returns 
 */
export function memoizeLocalStorage<T>(key:string, resolver:() => T):T {
  const localItem = localCache().getItem(key);
  const ret:T =  localItem === null ? 
    resolver() : 
    JSON.parse(localCache().getItem(key)) as T;
  
  localCache().setItem(key, JSON.stringify(ret));

  return ret;
}