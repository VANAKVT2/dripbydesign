const current_url = window.location.href;
let split_url = current_url.split('/');
let real_url = split_url[3];
console.log(real_url);
let body = document.getElementById('body');
switch (real_url) {
    case '':
        body.style.backgroundImage = 'url(./assets/backgrounds/homebckg.png)';
        body.style.backgroundSize = '100%';
        break;
    case 'about_us':
        body.style.backgroundImage = 'url(./assets/backgrounds/aboutusbckg.png)';
        body.style.backgroundSize = '100%';
        body.style.height = '2000px';
        break;
    case 'shopping':
        body.style.background = "linear-gradient(150deg, #5F729A 0%, #6E83A2 39%, #32664C 69%, #E8D176 100%)";
        body.style.backgroundSize = '100% 100%';
        body.style.height = '1080px';
        body.style.overflowY = 'hidden';
        break;
    case 'add_item':
        body.style.backgroundImage = 'url(./assets/backgrounds/additembckg.png)';
        body.style.backgroundSize = '100%';
        body.style.overflowY = 'hidden';
        break;
    default:
        console.log('default');
        break;
}