// PROMISE ANY ->korilayotgan pro lar orasida birinchi kelgan
// resolve javobni qaytradi agar hammasi reject bolsa aggregateError qaytarat
// let prol = Promise.reject("this promise retunr pro1");
// Let pro2 = Promise.reject("this promise returns pro2");
// Let pro3 - Promise.reject("this not done pro3");

// Let prol = new Promise((res, rej) => {
// setTimeout(() -> {
// rej("this pro1");
// }, 2000);

// let pro2 = new Promise((res, rej) => {
// setTimeout(() -> {
// rej("this pro2");
// }, 1000);

// Let pro3 = new Promise((res, rej) -> {
// setTimeout ( () => {
// rej("this pro3");
// }, 500);

// Promise.any([pro1, pro2, pro3]).then((res) => {
// console. Log(res);

// Promise.race -> birinchi qaytga javob
// Let pro1 - Promise.resolve("pro1");
// Let pro2 - Promise.reject("pro2");
// Let pro3 = Promise.resolve("pro3");
// /PROMISE ANY ->korilayotgan pro lar orasida birinchi kelgan
// resolve javobni qaytradi agar hammasi reject bolsa aggregateError qaytarat
// let prol = Promise.reject("this promise retunr prol");
// Let pro2 = Promise.reject("this promise returns pro2");
// Let pro3 - Promise.reject("this not done pro3");

// Let prol = new Promise((res, rej) => {
// setTimeout(() -> {
// rej("this pro1");
// }, 2000);

// let pro2 = new Promise((res, rej) => {
// setTimeout(() -> {
// rej("this pro2");
// }, 1000);

// Let pro3 = new Promise((res, rej) -> {
// setTimeout(() => {
// rej("this pro3");
// }, 500);

// Promise.any([pro1, pro2, pro3]).then((res) => {
// console. Log(res);

/// Promise.race -> birinchi qaytga javob
// Let pro1 = Promise.resolve("pro1");
// Let pro2 - Promise.reject("pro2");
// Let pro3 = Promise.resolve("pro3");

// Promise.race([pro1, pro2, pro3]).then((res) => {
// console. Log(res);
// });
document.getElementById('start').addEventListener('click', () => {
    const output = document.getElementById('output');
    output.innerHTML = '<p>Running promises...</p>';

    const dataPromise = new Promise((resolve) => {
        setTimeout(() => resolve(Array.from({ length: 10 }, (_, i) => `Data-${i + 1}`)), 1000);
    });

    const stringPromise = new Promise((resolve) => {
        setTimeout(() => resolve(Array.from({ length: 10 }, (_, i) => `String-${i + 1}`)), 2000);
    });

    const imagePromise = new Promise((resolve, reject) => {
        const random = Math.random();
        if (random > 0.2) {
            setTimeout(() => resolve(Array.from({ length: 10 }, (_, i) => `https://via.placeholder.com/150?text=Image-${i + 1}`)), 3000);
        } else {
            setTimeout(() => reject('Image Promise Failed'), 3000);
        }
    });


    Promise.all([dataPromise, stringPromise, imagePromise])
        .then((results) => {
            output.innerHTML += `<p><strong>Promise.all:</strong> All resolved successfully!</p>`;
            console.log('Promise.all results:', results);
        })
        .catch((error) => {
            output.innerHTML += `<p><strong>Promise.all:</strong> Failed with error: ${error}</p>`;
        });


    Promise.any([dataPromise, stringPromise, imagePromise])
        .then((result) => {
            output.innerHTML += `<p><strong>Promise.any:</strong> First resolved: ${JSON.stringify(result)}</p>`;
            console.log('Promise.any result:', result);
        })
        .catch((error) => {
            output.innerHTML += `<p><strong>Promise.any:</strong> All promises failed: ${error}</p>`;
        });


    Promise.race([dataPromise, stringPromise, imagePromise])
        .then((result) => {
            output.innerHTML += `<p><strong>Promise.race:</strong> First resolved/rejected: ${JSON.stringify(result)}</p>`;
            console.log('Promise.race result:', result);
        })
        .catch((error) => {
            output.innerHTML += `<p><strong>Promise.race:</strong> Failed with error: ${error}</p>`;
        });


    Promise.allSettled([dataPromise, stringPromise, imagePromise])
        .then((results) => {
            output.innerHTML += `<p><strong>Promise.allSettled:</strong> Completed with results.</p>`;
            console.log('Promise.allSettled results:', results);
        });
});

document.getElementById('fetchImages').addEventListener('click', () => {
    const imagePromise = new Promise((resolve) => {
        const images = Array.from({ length: 10 }, (_, i) => `https://via.placeholder.com/150?text=Image-${i + 1}`);
        
        setTimeout(() => {
            resolve(images);
        }, 2000);
    });

    const imageContainer = document.getElementById('imageContainer');
    imageContainer.innerHTML = '<p>Loading images...</p>';

    imagePromise
        .then((images) => {
            imageContainer.innerHTML = '';
            images.forEach((url) => {
                const img = document.createElement('img');
                img.src = url;
                img.alt = 'Generated Image';
                img.style.margin = '10px';
                imageContainer.appendChild(img);
            });
        })
        .catch((error) => {
            imageContainer.innerHTML = `<p>Error: ${error}</p>`;
        });
});

