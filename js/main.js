'use strict'
let target = document.getElementById('target');
let btnFind = document.getElementById('btnFind');
let btnPause = document.getElementById('btnPause');
let btnResume = document.getElementById('btnResume');
let loEl = document.getElementById('lo');
let hiEl = document.getElementById('hi');
let midEl = document.getElementById('mid');
let listOfNumbers = document.getElementById('listOfNumbers');
let listOfIndexes = document.getElementById('listOfIndexes');
let arr = [];
let preIndex = 0;
let flagPause = false;
const BIG_DELAY = 1000_000_000; 

arr = listOfNumbers.children;

btnFind.addEventListener('click',()=>{
    listOfNumbers.children[preIndex].classList.remove('success');
    document.getElementById('index').classList.remove('not-found');
    document.getElementById('index').innerHTML = '?';
    loEl.innerHTML = '?';
    hiEl.innerHTML = '?';
    midEl.innerHTML ='?';
    if(target.value.length>0){
        binary_search(arr,Number(target.value));
    } 
})

btnPause.addEventListener('click',()=>{
    btnPause.classList.add('hide');
    btnResume.classList.remove('hide');
    flagPause = true;
})

btnResume.addEventListener('click',()=>{
    btnResume.classList.add('hide');
    btnPause.classList.remove('hide');
    flagPause = false;
})


async function binary_search(A, target){
    let lo = 0, hi = A.length-1;
    while (lo <= hi){
        let mid = lo + Math.floor((hi - lo) / 2);
        loEl.innerHTML = lo+1;
        hiEl.innerHTML = hi+1;
        midEl.innerHTML = mid+1;
        await delay(1000);
        addClassToLoAndHi('border');
        await delay(1000);
        if (Number(A[mid].innerHTML) == target){
            listOfNumbers.children[mid].classList.add('success');
            document.getElementById('index').innerHTML = mid + 1;
            await pause();
            removeClassFromLoAndHi('border');
            preIndex = mid;
            return mid
        } else if (Number(A[mid].innerHTML) < target){
            listOfNumbers.children[mid].classList.add('wrong');
            await delay(1000);
            removeClassFromLoAndHi('border');
            await pause();
            lo = mid + 1;
        } else {
            listOfNumbers.children[mid].classList.add('wrong');
            await delay(1000);
            await pause();
            removeClassFromLoAndHi('border');
            hi = mid - 1 ;
        }  
        listOfNumbers.children[mid].classList.remove('wrong');
    }

    if(lo==hi||lo>hi){
        document.getElementById('index').classList.add('not-found');
        document.getElementById('index').innerHTML = 'Not found';
    }

    function addClassToLoAndHi(cl){
        listOfIndexes.children[lo].classList.add(cl);
        listOfIndexes.children[hi].classList.add(cl);
    }
    function removeClassFromLoAndHi(cl){
        listOfIndexes.children[lo].classList.remove(cl);
        listOfIndexes.children[hi].classList.remove(cl);
    }
}

function delay(ms){
    return new Promise(resolve=>setTimeout(resolve, ms));
}

async function pause(){
    while(flagPause){
        await delay(1000);
    }
}

