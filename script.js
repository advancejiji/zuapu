function renderTree() {
    const container = document.getElementById('treeContainer');
    let html = '';

    function showMember(id, level = 0) {
        const member = familyList.find(item => item.id == id);
        if (!member) return;

        const space = '&emsp;&emsp;'.repeat(level);
        const spouse = member.spouse ? familyList.find(item => item.id == member.spouse) : null;

        html += `
        <div class="tree-item">
            ${space}<span class="name">${member.name}</span>
            <span class="info">${member.birth}</span>
            ${spouse ? '｜配偶：' + spouse.name : ''}
        </div>`;

        member.children.forEach(childId => showMember(childId, level + 1));
    }

    showMember(1);
    container.innerHTML = html;
}

// 下载离线版
document.getElementById('downloadOffline').onclick = function () {
    Promise.all([
        fetch('index.html').then(res => res.text()),
        fetch('style.css').then(res => res.text()),
        fetch('data.js').then(res => res.text()),
        fetch('script.js').then(res => res.text())
    ]).then(([html, css, data, js]) => {
        let off = html
            .replace(`<link rel="stylesheet" href="style.css">`, `<style>${css}</style>`)
            .replace(`<script src="data.js"></script>`, `<script>${data}</script>`)
            .replace(`<script src="script.js"></script>`, `<script>${js}</script>`);

        const blob = new Blob([off], { type: 'text/html' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = '家族族谱.html';
        a.click();
    });
};

window.onload = renderTree;
