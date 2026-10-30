(() => {
  'use strict';
  const src = document.getElementById('paper-data');
  const host = document.getElementById('paper-list');
  const search = document.getElementById('paper-search');
  const count = document.getElementById('current-count');
  const moreWrap = document.getElementById('load-more-wrap');
  const moreBtn = document.getElementById('load-more');
  const filters = [...document.querySelectorAll('[data-filter]')];
  if (!src || !host || !search || !count || !moreWrap || !moreBtn) return;
  let papers = [];
  try { papers = JSON.parse(src.textContent); } catch (e) { host.textContent = '历史回放数据读取失败。'; return; }
  const kinds = {
    descriptive: ['临床描述', 'tag-descriptive'],
    mismatch: ['结局不匹配', 'tag-mismatch'],
    unclear: ['证据不明确', 'tag-unclear'],
    unread: ['未完成 AI 判读', 'tag-unread']
  };
  let active = 'all';
  let show = 8;
  const mk = (tag, className, text) => {
    const el = document.createElement(tag);
    if (className) el.className = className;
    if (text !== undefined) el.textContent = text;
    return el;
  };
  function card(p) {
    const art = mk('article','paper-card');
    const top = mk('div','paper-top');
    top.append(mk('span','paper-id',`PMID ${p.pmid}`));
    const label = mk('span','pill '+kinds[p.kind][1],kinds[p.kind][0]);
    top.append(label);art.append(top);
    const h=mk('h3','',p.title);h.title=p.title;art.append(h);
    const meta=mk('div','paper-meta');meta.append(mk('span','',p.design));meta.append(mk('span','','原始数据归档'));art.append(meta);
    const actions=mk('div','paper-actions');
    const toggle=mk('button','','查看证据 +');toggle.type='button';toggle.setAttribute('aria-expanded','false');
    const detail=mk('div','paper-detail');detail.hidden=true;
    detail.append(mk('small','','历史报告引文摘录（请回到 PubMed 核验）'));
    detail.append(mk('p',p.quote?'':'missing',p.quote || '该条记录无可核验引文；不能凭题目推断统计证据。'));
    const link=mk('a','','PubMed 原文 ↗');link.href='https://pubmed.ncbi.nlm.nih.gov/'+p.pmid+'/';link.target='_blank';link.rel='noopener noreferrer';
    toggle.addEventListener('click',()=>{const visible=detail.hidden;detail.hidden=!visible;toggle.textContent=visible?'收起证据 −':'查看证据 +';toggle.setAttribute('aria-expanded',String(visible));});
    actions.append(toggle,link);art.append(actions,detail);return art;
  }
  function filtered() {
    const term=search.value.trim().toLocaleLowerCase();
    return papers.filter(p=>(active==='all'||p.kind===active) && (!term || [p.title,p.pmid,p.quote,p.design].some(x=>x.toLocaleLowerCase().includes(term))));
  }
  function render(){
    const results=filtered();count.textContent=String(results.length);host.replaceChildren();
    if (!results.length) host.append(mk('div','paper-empty','没有符合条件的归档文献。请调整搜索词或分类。'));
    else host.append(...results.slice(0,show).map(card));
    moreWrap.hidden=results.length<=show;
    if (!moreWrap.hidden) moreBtn.textContent=`再显示 ${Math.min(8,results.length-show)} 篇 ↓`;
  }
  filters.forEach(b=>b.addEventListener('click',()=>{
    active=b.dataset.filter||'all';show=8;
    filters.forEach(f=>{f.classList.toggle('active',f===b);f.setAttribute('aria-pressed',String(f===b));});render();
  }));
  search.addEventListener('input',()=>{show=8;render();});
  moreBtn.addEventListener('click',()=>{show+=8;render();});
  render();
})();
