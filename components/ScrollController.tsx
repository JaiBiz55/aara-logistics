'use client';
import { useEffect } from 'react';

export default function ScrollController(){
  useEffect(()=>{
    if(window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
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
        gsap.utils.toArray<HTMLElement>('.serviceRail a').forEach((el,i)=>gsap.fromTo(el,{x:30,opacity:0},{x:0,opacity:1,duration:.6,delay:i*.03,scrollTrigger:{trigger:'.serviceRail',start:'top 82%'}}));
      });
      cleanup=()=>{ctx.revert();lenis.destroy();};
    }).catch(error=>console.error('Scroll enhancements could not load:',error));

    return()=>{disposed=true;cleanup?.();};
  },[]);
  return null;
}
