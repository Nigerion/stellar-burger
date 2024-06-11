<!--# Проектная работа 11-го спринта

[Макет](<https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design>)

[Чеклист](https://www.notion.so/praktikum/0527c10b723d4873aa75686bad54b32e?pvs=4)

## Этапы работы:

1. Разверните проект и ознакомьтесь с кодом. Все необходимые вам компоненты уже созданы и лежат в папке `src/components`

2. Настройте роутинг.

3. Напишите функционал запросов данных с сервера, используя `Redux` и глобальный `store`. Сами "ручки" уже прописаны и лежат в `utils/burger-api.ts`

4. Настройте авторизацию и создайте защищённые роуты.

## Важно:

Для корректной работы запросов к серверу необходимо добавить переменную BURGER_API_URL в окружение. Сама ссылка находится в файле `.env.example`.
-->

# Web-приложение выполнено в космической тематике.

# О проекте
Проект состоит из страницы оформления заказа в ресторане Stellar Burgers, которая представлена в форме интерактивного приложения, позволяющего клиентам самостоятельно составить свой бургер. На верхней части страницы расположена панель навигации с ссылками для перехода в другие разделы сайта. Основная часть страницы разделена на две секции: список доступных ингредиентов и составленный заказ.
![image](https://github.com/Nigerion/stellar-burger/assets/115921794/bade1a36-6e18-4f24-8be3-c438ce3ae2aa)

# Что было сделано
1. Написал и подключил store<br>
2. Сделал роутинг и авторизацию<br>
3. Написал следующие слои :<br>
- constructorSlice<br>
-  feedSlice<br>
- ingredietsSlice<br>
- orderSlice<br>
- userOrderSlice<br>
- userSlice<br>


# Какие тесты написанны
Тесты на Cypress<br>

Протестированы следующие функции:<br>
- Добавление ингредиента из списка в конструктор.
- Открытие и закрытие модального окна с информацией об ингредиенте.
- Проверка отображения данных конкретного ингредиента в открытом модальном окне при клике на него.
- Процесс оформления заказа: добавление ингредиентов в конструктор бургера, проверка правильного отображения модального окна с номером заказа при оформлении заказа, а также проверка очистки конструктора после оформления заказа.

Также настроены:<br>
- Файлы с данными ответов на запросы в папке cypress/fixtures для замены реальных запросов к бэкенду.
- Перехват всех запросов к бэкенду с помощью cy.intercept во время выполнения тестов.
- Перед тестом создания заказа в localStorage и cookie подставляются фейковые токены авторизации, и после завершения теста они очищаются.<br>

Тесты на Jest:<br>
Файлы Jest тестов находятся в папке tests.
- Написан тест, который проверяет корректную настройку и работу rootReducer: при вызове rootReducer с неопределенным состоянием и экшеном, который не обрабатывается ни одним редьюсером, возвращается правильное начальное состояние хранилища.
- Написаны тесты, проверяющие функционирование редьюсера конструктора бургера при добавлении и удалении ингредиента.
- Написаны тесты, проверяющие обработку редьюсером экшенов, генерируемых при выполнении асинхронного запроса: экшены начала запроса, успешного выполнения запроса и ошибки запроса.


# Какие планы по доработке проекта
* Написать регулярку для инпутов
*
# Технологии
HTML,CSS,SASS, TypeScript , Redux, React, React Router
# Установка и запуск
Проект запускается локально по адресу http://localhost:4000/ путем клонирования данного репозитория и последовательного запуска команд в терминале (должны быть установлены программы Git, NodeJS и менеджер пакетов npm).<br>

Клонируем репозиторию:<br>
`git clone https://github.com/Nigerion/stellar-burger.git`<br>
Заходим в папку:<br>
`cd stellar-burger`<br>
Устанавливам пакеты:<br>
`npm install`<br>
Запускаем проект:<br>
`npm run start`<br>
Запускаем тестирование(Jest)<br>
`npm test` //для тестирования<br>
Запускаем тестирование(Cypress)<br>
`npm run cypress:open` //для тестирования<br>
# Доступные скрипты
1.`npm start`<br>
2.`npm storybook`<br>
3.`npm build-storybook`<br>
4.`npm lint`<br>
5.`npm lint:fix`<br>
6.`npm format`<br>
7.`npm test`<br>
8.`npm run cypress:open`<br>
# Ссылка на макет и чеклист
Макет:<br>
[![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)](<https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design>) <br>
Чеклист:<br>
[![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)](https://www.notion.so/praktikum/0527c10b723d4873aa75686bad54b32e?pvs=4) <br>
<!-- [Макет](<https://www.figma.com/file/vIywAvqfkOIRWGOkfOnReY/React-Fullstack_-Проектные-задачи-(3-месяца)_external_link?type=design&node-id=0-1&mode=design>) 
![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)
[Чеклист](https://www.notion.so/praktikum/0527c10b723d4873aa75686bad54b32e?pvs=4)
![Notion](https://img.shields.io/badge/Notion-%23000000.svg?style=for-the-badge&logo=notion&logoColor=white)
-->
