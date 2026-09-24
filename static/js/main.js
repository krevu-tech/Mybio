// Данные файлов (такие же, как в React-версии)
const files = {
    'readme': {
        language: 'markdown',
        content: `# Hola, me soy Krevu. Мой псевдоним - славка. \n\n> frontend-разработчик с 7-летним стажем.\n\nЗнаю: HTML + CSS, Python, c#.`
    },
    'about': {
        language: 'typescript',
        content: `interface IDeveloper {\n  name: slavka;\n\n}\n\n`
    },
    'skills': {
        language: 'json',
        content: `{\n  "backend": ["Python", "Flask", "Some Django", "C#"],\n  "frontend": ["HTML", "CSS"]\n}`
    },
    'about': {
        language: 'python',
        content: `{\n  "name: slavka",\n \n"Age": 14,\n\n"Birthday": 20 September, born in Siberia. \n\n"friends": Faratos, Kuprik\n\n"languages": English, Russian(native), Spanish\n}`
    },
    'projects': {
    language: 'javascript',
    content: `{ \n"Finished (not published)": \n    "beta-tester: LastCup". Official Beta-tester for MilkyWay team.\n\n    Krevu's SFX --- SFX plugin for Sonolus project. \n\n    CatsExpress --- game about postcat on Unreal Engine 4.\n\n"Unfinished": \n\n    allformula.net --- website for f1 fanats.\n\n}`
    },
    'contacts': {
        language: 'python',
        content: `{\n u cant contact me. \n}`
    }
    // ... остальные файлы
};

// Загружаем Monaco
require.config({
    paths: { vs: 'https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.34.1/min/vs' }
});

let editor;

require(['vs/editor/editor.main'], function () {
    editor = monaco.editor.create(document.getElementById('editorContainer'), {
        value: files['readme'].content,
        language: files['readme'].language,
        theme: 'vs-dark',
        readOnly: true,
        minimap: { enabled: false },
        lineNumbers: 'on',
        fontSize: 14,
        scrollBeyondLastLine: false,
    });

    // Обновляем вкладку
    document.getElementById('currentTab').textContent = 'README.md';
});

// Переключение файлов
document.querySelectorAll('.file').forEach(fileEl => {
    fileEl.addEventListener('click', function() {
        const fileKey = this.dataset.file;
        const fileData = files[fileKey];
        if (!fileData) return;

        // Обновляем содержимое редактора
        if (editor) {
            editor.setValue(fileData.content);
            monaco.editor.setModelLanguage(editor.getModel(), fileData.language);
        }

        // Обновляем активный класс
        document.querySelectorAll('.file').forEach(f => f.classList.remove('active'));
        this.classList.add('active');

        // Обновляем таб
        document.getElementById('currentTab').textContent = this.textContent.trim();
    });
});

// Терминал (обработка команд)
const terminalOutput = document.getElementById('terminalOutput');
const terminalInput = document.getElementById('terminalInput');

terminalInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        const command = this.value.trim();
        if (!command) return;

        let output = '';
        switch (command) {
            case 'whoami':
                output = 'Slavka a.k.a. Krevu';
                break;
            case 'skills':
                output = 'python, HTML + CSS, C#';
                break;
            case 'friends':
                output = 'Kuprik, Faratos';
                break;
            case 'birthday':
                output = 'age = 14, birthday = 20 September';
                break;
            case 'clear':
                terminalOutput.innerHTML = '';
                this.value = '';
                return;
            default:
                output = `Команда не найдена: ${command}`;
        }

        terminalOutput.innerHTML += `<div>$ ${command}</div><div>${output}</div>`;
        this.value = '';
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
});