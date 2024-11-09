const fs = require('fs');
const path = require('path');
const { transliterate } = require('transliteration');

const renameFolder = 'changeName';
const outputFile = 'transliterations.txt';

function sanitizeFileName(name) {
    return name.replace(/ /g, '_').replace(/[<>:"/\\|?*]/g, '_');
}

fs.readdir(renameFolder, (err, files) => {
    if (err) {
        console.error(`Ошибка чтения директории: ${err.message}`);
        return;
    }

    const fileStream = fs.createWriteStream(outputFile);
    fileStream.on('error', (err) => {
        console.error(`Ошибка записи в файл: ${err.message}`);
    });

    const renameTasks = files.map(file => {
        return new Promise((resolve, reject) => {
            const filePath = path.join(renameFolder, file);
            const fileName = path.basename(file, path.extname(file));
            const ext = path.extname(file);

            let transliteratedName = transliterate(fileName);
            console.log(`Транслитерированное название (перед очисткой): ${transliteratedName}`);

            let newFileName = transliteratedName.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, ' ').trim() + ext;
            newFileName = sanitizeFileName(newFileName);
            const newFilePath = path.join(renameFolder, newFileName);

            fs.rename(filePath, newFilePath, (err) => {
                if (err) {
                    console.error(`Ошибка при переименовании файла "${file}": ${err.message}`);
                    fileStream.write(`Ошибка при переименовании файла "${file}": ${err.message}\n`);
                    reject(err);
                } else {
                    fileStream.write(`${file} -> ${newFileName}\n`);
                    console.log(`Файл переименован: ${file} -> ${newFileName}`);
                    resolve();
                }
            });
        });
    });

    Promise.allSettled(renameTasks).then(() => {
        fileStream.end();
        console.log(`Транслитерация завершена. Результаты записаны в ${outputFile}`);
    });
});