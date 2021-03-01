# Стек
Vue-router,Vuex,SASS
# Проблемы во время разработки
При отправке запросов ловил ошибку 400 с сообщением "Max number of elements reached for this resource", что мешало дальше проверять отправленную форму , НО до момента, когда эта ошибка появилась - все было нормально. Поэтому пришлось эмитировать отправку данных, чтобы работать дальше. В итоге, все должно работать, согласно ТЗ - данные должны отправляться и обрабатывать полученный ответ с дальнейшеми действиями, указанными в ТЗ.
# Установка проекта

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
