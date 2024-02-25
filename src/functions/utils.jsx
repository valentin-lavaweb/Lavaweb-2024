export const countComponents = () => {
    // Здесь вы можете реализовать логику подсчета компонентов
    // Например, используя рекурсивный обход файлов в директории src/components
    // и подсчитывая количество файлов, которые являются компонентами React
    // В этом примере предполагается использование Node.js для выполнения этой логики
    
    const fs = require('fs');
    const path = require('path');
  
    const directoryPath = path.join(__dirname, 'src/components'); // Путь к директории с компонентами
  
    let count = 0;
  
    const traverseDirectory = (directoryPath) => {
      const files = fs.readdirSync(directoryPath);
      files.forEach(file => {
        const filePath = path.join(directoryPath, file);
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
          traverseDirectory(filePath);
        } else if (file.endsWith('.jsx') || file.endsWith('.js')) {
          count++;
        }
      });
    };
  
    traverseDirectory(directoryPath);
  
    return count;
  };