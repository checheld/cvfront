import React, { useEffect } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Link, useLocation } from "react-router-dom";
import CVs from '../../img/CVs';
import Users from '../../img/Users';
import Projects from '../../img/Projects';
import Education from '../../img/Education';
import Technologies from '../../img/Technologies';
import WorkExp from '../../img/WorkExp'
import ProjectType from '../../img/ProjectType';
import '../Components.css';

const mainLinks = [
  { name: 'CVs', link: '/CVs', code: '1', icon: (x: string, y: string) => <CVs isActive={x === y} /> },
  { name: 'Users', link: '/Users', code: '2', icon: (x: string, y: string) => <Users isActive={x === y} /> },
  { name: 'Projects', link: '/Projects', code: '3', icon: (x: string, y: string) => <Projects isActive={x === y} /> },
]
const otherLinks = [
  { name: 'Education', link: '/Education', code: '4', icon: (x: string, y: string) => <Education isActive={x === y} /> },
  { name: 'Technologies', link: '/Technologies', code: '5', icon: (x: string, y: string) => <Technologies isActive={x === y} /> },
  { name: 'Work Experience', link: '/WorkExperience', code: '6', icon: (x: string, y: string) => <WorkExp isActive={x === y} /> },
  { name: 'Project type', link: '/ProjectType', code: '7', icon: (x: string, y: string) => <ProjectType isActive={x === y} /> },
]

export default function PermanentDrawerLeft() {

  const [selectedIndex, setSelectedIndex] = React.useState<string>('1');
  const location = useLocation();
  const currentPath = location.pathname;
  const allLinks = mainLinks.concat(otherLinks);
  const currentPathLink = String(
    currentPath.substring(currentPath.lastIndexOf('/'))
  );

  React.useEffect(() => {
    allLinks.map((x) => x.link === (currentPathLink) && setSelectedIndex(x.code))
  }, [selectedIndex]);

  const handleListItemClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    code: string,
  ) => {
    setSelectedIndex(code);
  };

  const VerticalDivider = () => (
    <Divider
      orientation="vertical"
      variant="middle"
      flexItem
    />
  );

  const handleClick = () => {
    sessionStorage.clear();
  };

  const CustomLink = (name: string, link: string, code: string, key: number, icon: (x: string, y: string) => JSX.Element) => {
    return (
      <ListItem button
        key={key}
        selected={selectedIndex === code}
        onClick={(event) => handleListItemClick(event, code)}>
        <Link to={link} className='link'>
          <ListItemIcon sx={{ paddingRight: '12.25px', width: '13,5px' }}>
            {icon(selectedIndex, code)}
          </ListItemIcon>
          <ListItemText primary={name} />
          {selectedIndex === code && <VerticalDivider />}
        </Link>
      </ListItem>
    )
  }

  let token = sessionStorage.getItem('oidc.user:https://identity-server-1.herokuapp.com:leviossacv');

  useEffect(() => {
    token = sessionStorage.getItem('oidc.user:https://identity-server-1.herokuapp.com:leviossacv');
  }, [currentPath, token]);

  return (
    <Box sx={{ display: 'flex' }}>
      {token && <Drawer
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '215px',
            boxSizing: 'border-box',
            backgroundColor: '#303439',
            pt: '35px',
            margin: 0,
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <img width='80px' src={require('../../img/LeviCV.svg').default} alt="logo" style={{ marginBottom: '35px', paddingLeft: '30px', }} />
        <Divider variant="inset" />
        <div className='sectionName'>MAIN</div>
        <List>
          {
            mainLinks.map((x, i) => CustomLink(x.name, x.link, x.code, i, x.icon))
          }
          <Divider variant="inset" sx={{ mt: '24.5px' }} />
          <div className='sectionName'>OTHER</div>
          {
            otherLinks.map((x, i) => CustomLink(x.name, x.link, x.code, i, x.icon))
          }
          <ListItem button sx={{ mt: '110px' }} >
            <Link to='/logout' className='link' onClick={handleClick}>
              <ListItemText primary='log out' />
            </Link>
          </ListItem>
        </List>
      </Drawer>}
    </Box>
  );
}
