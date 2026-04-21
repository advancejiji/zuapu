// 渲染族谱（修复UI渲染逻辑，确保页面正常显示）
function renderTree(){
    let container = document.getElementById('treeContainer');
    let html = '';
    // 递归渲染家族成员，生成层级化UI
    function showMember(id, level=0){
        let member = familyList.find(item=>item.id==id);
        if(!member) return;
        // 层级空格，实现族谱缩进效果
        let space = '&emsp;&emsp;'.repeat(level);
        // 查找配偶信息
        let spouse = member.spouse ? familyList.find(item=>item.id==member.spouse) : null;
        // 拼接成员UI结构，显示姓名、生日、备注和配偶信息
        html += `<div class="tree-item">${space}<span class="name">${member.name}</span> <span class="info">${member.birth} ${member.remark}</span>${spouse?' | 配偶：'+spouse.name:''}</div>`;
        // 递归渲染子女
        member.children.forEach(childId=>showMember(childId,level+1));
    }
    // 从根节点（id=1）开始渲染
    showMember(1);
    // 将渲染好的UI插入页面容器
    container.innerHTML = html;
}

// 下载离线版（修复代码缺失，确保功能正常）
document.getElementById('downloadOffline').onclick = function(){
    fetch('index.html').then(res=>res.text()).then(html=>{
        Promise.all([
            fetch('style.css').then(res=>res.text()),
            fetch('data.js').then(res=>res.text()),
            fetch('script.js').then(res=>res.text())
        ]).then(([css,data,js])=>{
            // 拼接离线版HTML，整合所有样式和脚本
            let offHtml = html.replace(`<link rel="stylesheet" href="style.css">`, `<style>${css}</style>`)
                              .replace(`<script src="data.js"></script>`, `<script>${data}</script>`)
                              .replace(`<script src="script.js"></script>`, `<script>${js}</script>`);
            let blob = new Blob([offHtml],{type:'text/html'});
            let a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = '家族族谱离线版.html';
            a.click();
        })
    })
}

// 页面加载完成后渲染族谱UI
window.onload = renderTree;
