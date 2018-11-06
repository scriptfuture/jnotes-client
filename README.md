# jnotes-client

Заметки на React + Redux

На основе ![react-redux-notes](https://github.com/scriptfuture/react-redux-notes)

Веб-клиент для rest-api ![jnotes](https://github.com/scriptfuture/jnotes)

## Улучшения (по сравнению с react-redux-notes)

- Дизайн на основе ![Bootstrap](https://github.com/twbs/bootstrap)
- Обработка ошибок сервера
- Добавлен загрузчик ajax (картинка на время ответа сервера)
- В режиме отладки (когда запущен dev-сервер) приложение подгружает заглушки

## Установка

Cтавим yarn, если не установлен
```bash
npm install --global yarn
```

Инсталяция приложения
```bash
cd jnotes-client

yarn
```

## Запуск dev-сервера

```bash
yarn start
```

## Сборка

```bash
yarn build
```

## Скриншот
![Скриншот](screenshot-v2.png)