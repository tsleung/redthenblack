# Red then Black

## Setup

### Get repo
```git clone <repo>```

### Get nvm https://github.com/nvm-sh/nvm
```curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash```

### Install node and npm
```nvm install node```

### Install all node modules (in my-app): 
```npm install```

### Start dev server 
```./node_modules/@angular/cli/bin/ng serve --open```

### Upload
```./node_modules/@angular/cli/bin/ng build --prod```

### Angular framework
```ng generate component <name>``

### Bootstrap
```./node_modules/@angular/cli/bin/ng add @ng-bootstrap/ng-bootstrap```

### Deploy
```
ng build
cp ../CNAME ../docs/CNAME
cp ../docs/index.html ../docs/404.html
git add --all ../docs
git commit -m "Updated deployment"
git push
```

### Markdown
https://www.npmjs.com/package/ngx-markdown
```npm install ngx-markdown --save```
In angular.json add
```
"scripts": [
  "node_modules/marked/lib/marked.js"
]
```
###
Github pages
```
https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site
```
### Firebase
```
npm install -g firebase-tools

```

In firebase folder, run
```
firebase init
```
Add cloud functions and use the red-then-black app

Dev loop includes
```
npm run build
firebase emulators:start --only functions
```

Install npm dependencies in firebase directory
```
npm install node-fetch --save
npm install express --save
npm install cors --save
```
Deploy cloud functions
```
firebase deploy --only functions

```

