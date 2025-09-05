const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then((res) => res.json())
        .then((json) => displayLesson(json.data));
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
    }));

};

const loadLevelWord = id => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url).then(res => res.json())
        .then(json => displayLevelWord(json.data))
}

const displayLevelWord = (words) => {
    const levelWordContainer = document.getElementById('level-word-card-container');
    levelWordContainer.innerHTML = '';
    if(words.length===0){
        levelWordContainer.innerHTML=`
        <div class="flex  flex-col justify-center items-center col-span-full text-center gap-4 p-5">
    <img src="assets/alert-error.png" alt="">
    <h3 class="bangla text-md text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</h3>
    <h1 class="text-2xl">নেক্সট Lesson এ যান</h1>
</div>
        
        `
        return;
    }
    words.forEach(word => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div
           class="flex flex-col justify-center items-center border border-gray-300 py-10 px-0  shadow-sm rounded-lg bg-white gap-3">
           <h1 class="text-4xl font-bold">${word.word}</h1>
           <h2 class="text-2xl">Meaning/Pronounciation</h2>
           <h1 class="bangla text-3xl font-semibold">"${word.meaning} / ${word.pronunciation}"</h1>
           <div class="flex justify-between w-full px-12 items-center ">
           <div><button class="bg-gray-200 rounded-md p-2 "><i class="fa-solid fa-circle-info"></i></button></div>
           <div><button class="bg-gray-200 rounded-md p-2 "><i class="fa-solid fa-volume-high "></i></button></div>
           </div>
        </div>
         `
        levelWordContainer.appendChild(div);
    });
};
loadLesson();