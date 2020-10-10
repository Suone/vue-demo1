import styles from '@/assets/styles/public.scss';

const baseSize = styles.baseSize;
const baseWidth = styles.baseWidth;
const pcBaseSize = styles.pcBaseSize;
const pxToRemWidth = styles.mediaScreenMaxWidth;

function setRem() {
    if (document.documentElement.clientWidth > pxToRemWidth) {
        document.documentElement.style.fontSize = pcBaseSize + 'px';
    } else {
        const scale = document.documentElement.clientWidth / baseWidth;
        document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px';
    }
}
setRem();
window.onresize = function () {
    setRem();
}