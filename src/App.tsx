import { Component, createSignal } from 'solid-js';
import LinkedinLogo from './assets/linkedin-logo-2.png';
import StackoverflowLogo from './assets/stackoverflow-logo-2.png';
import styles from './App.module.css';
import AppLink from './commons/components/AppLink.jsx';
import anime from 'animejs/lib/anime.es.js';

const App: Component = () => {
  const [links] = createSignal([
    {
      link: 'https://www.linkedin.com/in/kitanga-nday-86795ab6/',
      title: 'Web',
    },
    {
      link: 'https://www.linkedin.com/in/kitanga-nday-86795ab6/',
      title: 'Game',
    },
    {
      link: 'https://soundcloud.com/kephas-music',
      title: 'Music',
    },
    {
      link: 'https://dev.to/kitanga_nday/',
      title: 'Blogging',
    },
  ])
  const [socials] = createSignal([
    {
      link: 'https://www.linkedin.com/in/kitanga-nday-86795ab6/',
      img: LinkedinLogo,
      alt: 'Social link to Linkedin account'
    },
    {
      link: 'https://stackoverflow.com/users/4831083/kitanga-nday',
      img: StackoverflowLogo,
      alt: 'Social link to Stackoverflow account'
    },
  ])

  const [isHovered, setIsHovered] = createSignal(false);
  const [shouldFade, setShouldFade] = createSignal(false);
  const [cursorPos, setCursorPos] = createSignal({
    x: -100,
    y: -100,
  });

  const isTouchDevice = (('ontouchstart' in window) ||
    (navigator.maxTouchPoints > 0) ||
    // @ts-ignore
    (navigator.msMaxTouchPoints > 0));

  let prevAnim: anime.AnimeInstance | undefined;
  window.onmousemove = ({ clientX, clientY }) => {
    const pos = { x: clientX, y: clientY };
    setCursorPos(pos)

    if (prevAnim) {
      anime.remove(prevAnim)
    }

    prevAnim = anime({
      targets: '#cursor',
      translateX: pos.x - 12.5,
      translateY: pos.y - 12.5,
      translateZ: 0,
      scale: isHovered() ? 2.5 : 1,
      duration: 700,
    });
  };

  window.ontouchend = () => {

    if (prevAnim) {
      anime.remove(prevAnim)
    }

    ([document.getElementById('cursor'), document.getElementById('dot')] as HTMLDivElement[]).forEach((ele: HTMLDivElement | null) => {
      if (ele) {
        ele.style.display = 'none';
      }
    })
  }

  return (
    <div class={[styles.App, shouldFade() ? styles.faded : ''].join(' ')}>
      <div
        id="dot"
        class={styles.dot}
        style={{
          transform: `translateX(${cursorPos().x - 1.5}px) translateY(${cursorPos().y - 1.5}px) translateZ(0)`,
        }}></div>
      <svg id="cursor" width="6.8mm" height="6.8mm" version="1.1" viewBox="0 0 6.8 6.8" xmlns="http://www.w3.org/2000/svg" style={{
        // transform: `translateX(${cursorPos().x - 12.5}px) translateY(${cursorPos().y - 12.5}px) translateZ(0)`,
        opacity: isHovered() ? '0.5' : '1',
        "mix-blend-mode": `color-burn`,
        "z-index": 10000,
        position: 'fixed',
        "pointer-events": 'none',
        display: 'block',
        top: 0,
        left: 0,
      }}>
        <circle cx="3.3966" cy="3.4048" r="2.5135" style={{
          fill: `${isHovered() ? '#1a1a1a' : 'transparent'}`,
          transition: 'fill .14s',
        }} stroke='#1a1a1a' stroke-width=".26458" />
      </svg>
      {/* scale(${isHovered() ? 2.5 : 1}) */}
      <header class={styles.header}>
        <h1 class={styles.h1}>
          <span>Kitanga</span>&nbsp;
          <span>Nday</span>
        </h1>
        <h2 class={styles.subtext}><span>Senior Fullstack Developer</span></h2>
        <div class={`${styles.subtext} ${styles.links}`}>

          {links().map((linkDef, ix, arr) => {
            const postFix = ix < arr.length - 1 ? ' • ' : '';

            return <><AppLink onHover={(state: boolean) => (setShouldFade(state), setIsHovered(state))} link={linkDef.link} title={linkDef.title} />{postFix}</>
          })}
        </div>
        <div class={styles.socials}>
          {socials().map(socialDef => (
            <a
              href={socialDef.link}
              onMouseEnter={() => (setShouldFade(true), setIsHovered(true))}
              onMouseLeave={() => (setShouldFade(false), setIsHovered(false))}
              target="_blank"
            >
              <img src={socialDef.img} alt={socialDef.alt} />
            </a>
          ))}
        </div>
      </header>
      <footer class={styles.footer}>
        &copy; Kitanga Nday {(new Date()).getFullYear()}
      </footer>
    </div>
  );
};

export default App;
