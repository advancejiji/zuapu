// 渲染族谱
function renderTree(){
    let container = document.getElementById('treeContainer');
    let html = '';
    function showMember(id, level=0){
        let member = familyList.find(item=>item.id==id);
        if(!member) return;
        let space = '&emsp;&emsp;'.repeat(level);
        let spouse = member.spouse ? familyList.find(item=>item.id==member.spouse) : null;
       <div class="tree-item">${space}<span class="name">${member.name}</span> <span class="info">${member.birth} ${member</span>${spouse?' | 配偶：'+spouse.name:''</div>`;
        member.children.forEach(childId=>showMember(childId,level+1));
    }
    showMember(1);
    container.innerHTML = html;
}

// 下载离线版
document.getElementById('downloadOffline').onclick = function(){
    fetch('index.html').then(res=>res.text()).then(html=>{
        Promise.all([
            fetch('style.css').then(res=>res.text()),
            fetch('data.js').then(res=>res.text()),
            fetch('script.js').then(res=>res.text())
        ]).then(([css,data,js])=>{
            let off<link rel="stylesheet" href="<style</style>`)<script</script>',`<script>${data}</script>`)
                              .<script src="script<script</script>`);
            let blob = new Blob([offHtml],{type:'text/html'});
            let a = document.createElement('a');
            a.href = URL.createObjectURL(blob);
            a.download = '家族族谱离线版.html';
            a.click();
        })
    })
}

// 页面加载渲染
window.onload = renderTree;
