import { Avatar, Fade, Grid, Hidden, Tooltip, Typography, useMediaQuery, useTheme, Zoom } from '@mui/material';
import Cancel from '@mui/icons-material/Cancel';
import clsx from 'clsx';
import { makeStyles } from '@mui/styles';
//import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import simpleIcons from 'simple-icons';
import { skills } from '../data.json';
import { iconify } from './util';

const wrapper = (sk = []) =>
 sk.map((v) => {
  const ic = simpleIcons.get(typeof v === 'string' ? iconify(v) : iconify(v.icon)) || {
   title: v,
   hex: '424242',
   component: <Cancel />,
  };
  return {
   alt: v.alt || v || ic.title,
   backgroundColor: v.backgroundColor || '#' + ic.hex,
   icon: ic.component || (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
     <title>{ic.title}</title>
     <path d={ic.path} fill="white" />
    </svg>
   ),
  };
 });

let wrappedSkills = {};
Object.getOwnPropertyNames(skills).forEach((type) => {
 wrappedSkills[type] = wrapper(skills[type]);
});

let iobj = {};
Object.values(wrappedSkills).forEach((oarr) => {
 oarr.forEach(({ backgroundColor, alt }) => {
  iobj[alt] = { backgroundColor };
 });
});

const useStyles = makeStyles((theme) => ({
 cont: {
  minHeight: `calc(100vh - ${theme.spacing(4)}px)`,
 },
 skobj: {
  marginBottom: theme.spacing(4),
 },
 avatar: {
  height: theme.spacing(7),
  width: theme.spacing(7),
  padding: theme.spacing(1.5),
 },
 ...iobj,
}));

export default function Skills() {
 const classes = useStyles();
 const theme = useTheme();
 const mdDown = useMediaQuery(theme.breakpoints.down('md'));
 const align = mdDown ? 'center' : 'flex-end';
 const textAlign = mdDown ? 'center' : 'right';

 const [animate, setAnimate] = useState(false);
 const animRef = useRef();

 useEffect(() => {
  const observer = new IntersectionObserver((entries) => {
   if (entries.some((entry) => entry.isIntersecting)) setAnimate(true);
  });
  observer.observe(animRef.current);
  return () => observer.unobserve(animRef.current);
 }, []);

 return (
  <Grid container justify="center" alignItems="center" spacing={10} className={classes.cont}>
   <Grid item xs={12} lg={6} ref={animRef}>
    <Typography variant="h2" gutterBottom align="center">
     Skills
    </Typography>
    <Hidden mdDown>
     <Fade in={animate} style={{ transitionDelay: '100ms' }}>
      <div>
       <img alt="Skills" src="/skill.svg" width="1139" height="655" />
      </div>
     </Fade>
    </Hidden>
   </Grid>
   <Grid container item xs={12} lg={6} direction="column" spacing={1} alignItems={align}>
    {Object.getOwnPropertyNames(wrappedSkills).map((title, id) => (
     <Grid item key={id} className={classes.skobj}>
      <Typography variant="h4" align={textAlign} gutterBottom component="p">
       {title}
      </Typography>
      <Grid container item direction="row" spacing={1} justify="center">
       {wrappedSkills[title].map(({ alt, icon }, i) => (
        <Grid item key={i}>
         <Zoom in={animate} style={{ transitionDelay: `${150 * i}ms` }}>
          <Tooltip title={alt.replace('_', ' ')} placement="top">
           <Avatar variant="rounded" className={clsx([classes.avatar, classes[alt]])}>
            {icon}
           </Avatar>
          </Tooltip>
         </Zoom>
        </Grid>
       ))}
      </Grid>
     </Grid>
    ))}
   </Grid>
  </Grid>
 );
}
