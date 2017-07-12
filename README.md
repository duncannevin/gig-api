# Gig RESTful api ##

This api is for use by freelance sites to track freelancers and posters.

---

## Global Dependancies ##

- Required
```
# NodeJS 7.0.0 +
brew install node

# Gulp 3.9.1
npm install gulp@3.9.1 -g

# TypeScript 2.0.6 +
npm install typescript@2.0.6 -g
(Should be fine to use @latest, but if this does not work this template was built on v2.0.6)

# nodemon
npm install nodemon@latest -g
```

- Suggested
```
# httpie
brew install httpie
(This is a clever tool for easily executing http calls from the terminal)
```

---

## Dependancies ##

```
# install
npm install
```

---

## Build ##

```
# dev
npm run dev
(This will run Gulp with watch. Created dist/ directory)

# production
npm run build
(Builds src file and created dist/ directory)
```

## Serve ##

```
# dev
npm run liveserve
(runs nodemon on dist/index.js)

# production
npm start
```

## Test ##

```
# test
npm test
```

## Seed DB ##

Tests will not pass without this seed added!

```
# build app
npm run build

# start app
npm run liveserve

# in a new terminal
npm run seed
```
