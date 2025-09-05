const displaySYnonyms = (synonyms) => {
    const htmlE = synonyms.map(el => `<p class="bg-[#EDF7FF] w-fit p-2 rounded-md">${el}</p>`);
    return htmlE.join('');
};

const getSpiner = (status) => {
    if (status == true) {
        document.getElementById('spiner').classList.remove('hidden');
        document.getElementById('level-word-card-container').classList.add('hidden');
    }
    else {
        document.getElementById('spiner').classList.add('hidden');
        document.getElementById('level-word-card-container').classList.remove('hidden');
    }
}

const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => {
            displayLesson(json.data);
        });
};

const displayLesson = (lessons) => {
    //1.determine parent container and get null
    const lessonContainer = document.getElementById('lesson-container');
    lessonContainer.innerHTML = '';
    lessons.forEach((lesson => {
        //2.create parent div
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="flex justify-center items-center">
         <button id="lesson-btn-${lesson.level_no}" onclick="loadLevelWord(${lesson.level_no})"  class="btn btn-outline btn-primary lesson-btn">
                 <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
                  </button>
         </div>`
        lessonContainer.appendChild(div);
        getSpiner(false)
    }));

};
const removeActive = () => {
    const removeBtn = document.querySelectorAll('.lesson-btn');
    removeBtn.forEach(btn => {
        btn.classList.remove('active');
    })

};

const loadLevelWord = (id) => {
   getSpiner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url).then(res => res.json())
        .then(json => {
            removeActive();
            const lessonBtn = document.getElementById(`lesson-btn-${id}`);
            lessonBtn.classList.add('active');
            displayLevelWord(json.data);
            
        });
};
const displayLevelWord = (words) => {
     
    const levelWordContainer = document.getElementById('level-word-card-container');
    levelWordContainer.innerHTML = '';
    if (words.length === 0) {
        levelWordContainer.innerHTML = `
        <div class="flex  flex-col justify-center items-center col-span-full text-center gap-4 p-5">
          <img src="assets/alert-error.png" alt="">
          <h3 class="bangla text-md text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h3>
          <h1 class="text-2xl">নেক্সট Lesson এ যান</h1>
        </div>
        
        `
        getSpiner(false);
        return;
    }
    words.forEach(word => {
        
        const div = document.createElement('div');
        div.innerHTML = `
        <div
           class="flex flex-col justify-center items-center border border-gray-300 py-10 px-0  shadow-sm rounded-lg bg-white gap-3">
           <h1 class="text-4xl font-bold">${word.word ? word.word : 'Missing Word'}</h1>
           <h2 class="text-2xl">Meaning/Pronounciation</h2>
           <h1 class="bangla text-3xl font-semibold">"${word.meaning ? word.meaning : "অর্থ খুঁজে পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : 'উচ্চারণ পাওয়া যায়নি'}"</h1>
           <div class="flex justify-between w-full px-12 items-center ">
           <div><button onclick="loadWordDetails(${word.id})" class="bg-gray-200 rounded-md p-2 "><i class="fa-solid fa-circle-info"></i></button></div>
           <div><button  class="bg-gray-200 rounded-md p-2 "><i class="fa-solid fa-volume-high "></i></button></div>
           </div>
        </div>
         `
        levelWordContainer.appendChild(div);
        getSpiner(false);
    });
};

const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
};
const displayWordDetails = (data) => {
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = '';
    const div = document.createElement('div');
    div.innerHTML = `
     <div class=" flex flex-col gap-5">
         <h3 class="text-lg font-bold">${data.word} (<i class="fa-solid fa-microphone-lines"></i>:${data.pronunciation})</h3>
         <div class="flex flex-col gap-2">
             <h4>Meaning</h4>
             <p>${data.meaning}</p>
         </div>
        <div class="flex flex-col gap-2">
             <p>Example</p>
             <p>${data.sentence}</p>
         </div>
         <div class="flex flex-col gap-2">
         <h1>সমার্থক শব্দ গুলো</h1>
         <div class="flex gap-2">
             ${displaySYnonyms(data.synonyms)}
         </div>
         </div>
     </div>
 `
    detailsContainer.appendChild(div);
    document.getElementById("word_modal").showModal();

};

loadLesson();