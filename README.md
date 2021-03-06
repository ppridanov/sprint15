# Backend for sprint15
## Описание
------------
Этот проект создан в обучающих целях. На данный момент это полноценно функционирующий проект на Node.js.

### Возможности!
------------
- Создание и изменение пользователей.
- Создание, удаление, изменение, лайк карточек.

### Установка
------------
Для запуска REST.API требуется [Node.js](https://nodejs.org/) v12+.

Скачайте или клонируйте проект из Github. Установите все зависимости, в том числе и dev зависимости, и запустите сервер

```sh
    $ git clone https://github.com/ppridanov/sprint15.git
    $ npm install
    $ node app.js
```

### Использование
------------
##### Действия с пользователями
  
**Регистрация пользователя**
Отправьте POST запрос на адрес **```/signup```**. В теле запроса укажите:
1. ```"Name"``` - Имя пользователя. Не менее 2 и не более 30 символов. Обязательно к заполнению.
2. ```"Email"``` - Почтовый ящик. Проходит проверку на валидность введенного адреса. Обязательно к заполнению.
3. ```"Password"``` - Пароль. Не менее 8 символов. Обязательно к заполнению.
4. ```"About"``` - Информацию о пользователе. Не менее 2 и не более 30 символов. Обязательно к заполнению.
5. ```"Avatar"``` - Ссылка на картинку. Проходит проверку по шаблону на наличии ссылки.

 В теле ответа придет сообщение об успешном создании или ошибка.
 
**Авторизация пользователя**
Отправьте POST запрос на адрес **```/signin```**. В теле запроса укажите:
1. ```"Email"``` - Почтовый ящик. Проходит проверку на валидность введенного адреса. Обязательно к заполнению.
2. ```"Password"``` - Пароль. Не менее 8 символов. Обязательно к заполнению.

В теле ответа придет сообщение об успешном входе или ошибка.

**Изменение информации о пользователе**
Отправьте PATCH запрос на адрес **```/users/me```**. В теле запроса укажите:
1. ```"Name"``` - Имя пользователя. Не менее 2 и не более 30 символов. Обязательно к заполнению.
2. ```"About"``` - Информацию о пользователе. Не менее 2 и не более 30 символов. Обязательно к заполнению.

В теле ответа придет массив с обновленными данными пользователя

**Изменение аватара пользователя**
Отправьте PATCH запрос на адрес **```/users/me/avatar```**. В теле запроса укажите:
1. ```"Avatar"``` - Ссылка на картинку. Проходит проверку по шаблону на наличии ссылки.

В теле ответа придет массив с обновленными данными пользователя

**Получение списка пользователей**
Отправьте GET запрос на адрес **```/users/```**. В теле ответа вернется массив со всеми созданными пользователями.

**Получение своего пользователя**
Отправьте GET запрос на адрес **```/users/me```**. В теле ответа вернется массив с авторизованным пользователем.

##### Действия с карточками

**Создание карточки**
Отправьте POST запрос на адрес **```/cards```**. В теле запроса укажите:
1. ```"Name"``` - Название создаваемой карточки. Не менее 2 и не более 30 символов. Обязательно к заполнению.
2. ```"Link"``` - Ссылка на картинку. Проходит проверку по шаблону на наличии ссылки.

 В теле ответа придет массив с созданной карточкой.

**Удаление карточки**
Отправьте DELETE запрос на адрес **```/cards/:cardId```**. Где :cardId - ID созданной ранее карточки.

 В теле ответа придет массив с удаленной карточкой.
 
 **Получение списка карточек**
Отправьте GET запрос на адрес **```/cards/```**. В теле ответа вернется массив со всеми созданными карточками.

 **Поставить лайк карточке**
Отправьте PUT запрос на адрес **```/cards/:cardId```**. Где :cardId - ID созданной ранее карточки.

 В теле ответа придет массив с карточкой и обновленным полем Likes.
 
  **Удалить лайк карточке**
Отправьте DELETE запрос на адрес **```/cards/:cardId```**. Где :cardId - ID созданной ранее карточки.

 В теле ответа придет массив с карточкой и обновленным полем Likes.
 
### Разработка
------------
В проекте предусмотрена разработка в режиме dev.

Для запуска в режиме разработчика используйте команду:

```sh
$ npm run dev
```
Для тестирования в режиме продакшна используйте команду:
```sh
$ npm run start
```
### Todos
------------
 - Подключить фронтенд к проекту
 - Добавить возможность администрирования учетных записей (блокировка, удаление, изменение информации).

### Лицензия
---------
MIT

### Адрес на котором находится сервер: 
-------
**IP**: ``84.201.156.86``; 
**HTTP**: ``http://api.pridanov.site``; 
**HTTPS**: ``https://api.pridanov.site``;
### Журналы ошибок и запросов
------
```Request.log``` = Журнал логов с запросами. 
```Error.log``` = Журнал логов с ошибками.

##### Версия v1.0
