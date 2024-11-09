# Транслитерация и Переименование Файлов

Этот скрипт на `Node.js` предназначен для транслитерации, очистки и переименования файлов в указанной директории. Он считывает файлы из папки `renameFolder`, транслитерирует их названия в английские символы, удаляет специальные символы и заменяет пробелы на символы подчеркивания. 
Результирующие названия файлов сохраняются в указанный файл (`transliterations.txt`), также записываются ошибки, возникшие в процессе.

## Возможности

- **Транслитерация**: Преобразует имена файлов с неанглийскими символами в английскую транслитерацию.
- **Очистка**: Заменяет пробелы и специальные символы на символы подчеркивания, что делает имена файлов совместимыми с разными файловыми системами.
- **Логирование ошибок**: Записывает ошибки, возникшие при переименовании, как в консоль, так и в выходной файл.
- **Асинхронное переименование**: Обрабатывает все файлы асинхронно, что позволяет справляться с большим количеством файлов без блокировки основного потока.

## Требования

Перед использованием убедитесь, что у вас установлены `Node.js`. Скрипт использует `Node.js` для работы с файлами и пакет `transliteration` для преобразования символов в английскую транслитерацию.

### Установка

1. Установите [Node.js](https://nodejs.org/), если он еще не установлен.
2. Выполните следующую команду в терминале:

   ```npm install```

3. Поместите все файлы, которые нужно переименовать, в папку `changeName`.
4. Запустите код, введя команду:

    ```node app.js```

5. Все файлы в папке `changeName` будут переименованы, и создастся файл `transliterations.txt` с информацией о произведенных изменениях.

## Описание Кода

- `sanitizeFileName(name)`: Функция для замены пробелов и спецсимволов в именах файлов на символы подчеркивания.
- `fs.readdir`: Считывает содержимое папки `renameFolder`.
- `transliterate`: Используется для преобразования имени файла в английские символы.
- `Promise.allSettled`: Обрабатывает все задачи по переименованию асинхронно.