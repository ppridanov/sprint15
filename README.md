#**Проектная работа №15**

[Ссылка на мою работу](https://ppridanov.github.io/sprint15 "Проектная работа №15")

**5 курс. Проект Rest API**.

**Адрес на котором находится сервер:**
**IP:** *84.201.156.86*;
**HTTP:** *http://api.pridanov.site;*
**HTTPS:** *https://api.pridanov.site;*



Для запуска используйте следующие команды
1. **"Start"** - Скрипт для запуска сервера в Production MODE.

2. **"Dev"** - Скрипт для запуска сервера в Dev MODE.

Запрос на создание нового пользователя
**POST *"/signup"*** = Создает нового пользователя. Используйте *"Name"*, *"Email"*, *"Password"*, *"About"*, *"Avatar"*.

Запрос на авторизацию
**POST *"/signin"*** = Авторизация на сервера. Используйте *"Email"*, *"Password"*.

Тестирование на краш тест
**GET *"/crash-test"*** = Проверка работы pm2 на сервере.

Использование запросов для **/users**

**GET *"/users"*** = Возвращает всех пользователей,
**GET *"/users/:userId"*** = Возвращает одного пользователя,
**PATCH *"/users/me"*** = Изменяет информацию о пользователе. Используйте *"Name"* и *"About"*.
**PATCH *"/users/me"*** = Изменяет информацию о пользователе. Используйте *"Name"* и *"About"*.
**PATCH *"/users/me/avatar"*** = Изменяет аватар пользователя. Используйте *"Avatar"*.


Использование запросов для **/cards**

**GET *"/cards"*** = Возвращает все карточки.
**GET *"/cards/:cardID"*** = Возвращает одну карточку с указанным в адресе ID.
**POST *"/cards"*** = Создает новую карточку. Используйте *"Name"* и *"Link"*.
**DELETE *"/cards/:cardId"*** = Удаляет карточку с указанным в адресе ID.
**PUT *"/cards/:cardId/likes*** = Ставит лайк карточке с указанным в адресе ID.
**DELETE *"/cards/:cardId/likes*** =  Удаляет лайк карточке с указанным в адресе ID.

Request.log = Журнал логов с запросами.
Error.log = Журнал логов с ошибками.
version **1.0.0**

