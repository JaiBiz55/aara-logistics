'use client';
import { useEffect } from 'react';

export default function ScrollController(){
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if(window.matchMedia('(hover: none) and (pointer: coarse)').matches) return;
    let disposed=false;
    let cleanup:(()=>void)|undefined;

    void Promise.all([import('gsap'),import('gsap/ScrollTrigger'),import('lenis')]).then(([gsapModule,scrollTriggerModule,lenisModule])=>{
      if(disposed) return;
      const gsap=gsapModule.default;
      gsap.registerPlugin(scrollTriggerModule.ScrollTrigger);
      const lenis=new lenisModule.default({autoRaf:true,smoothWheel:true,anchors:true});
      const ctx=gsap.context(()=>{
        const hero=document.querySelector('#hero');
        if(hero){
          gsap.to('.homeHeroInner',{y:120,opacity:.25,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:1}});
          gsap.to('.homeHeroBg',{scale:1.12,yPercent:5,ease:'none',scrollTrigger:{trigger:hero,start:'top top',end:'bottom top',scrub:1}});
        }
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach(el=>gsap.fromTo(el,{y:35,opacity:0},{y:0,opacity:1,duration:.8,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 88%',toggleActions:'play none none reverse'}}));
        gsap.utils.toArray<HTMLElement>('.serviceTourRow').forEach((el)=>gsap.fromTo(el,{y:24,opacity:0},{y:0,opacity:1,duration:.65,ease:'power2.out',scrollTrigger:{trigger:el,start:'top 86%',once:true}}));
      });
      cleanup=()=>{ctx.revert();lenis.destroy();};
    }).catch(error=>console.error('Scroll enhancements could not load:',error));

    return()=>{disposed=true;cleanup?.();};
  },[]);
  return null;
}
