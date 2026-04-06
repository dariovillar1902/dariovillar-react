import React, { useContext } from 'react';
import { Container } from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { DarkModeContext } from './darkModeContext';
import InterviewQAComponent from './InterviewQAComponent';
import InterviewLeetCodeComponent from './InterviewLeetCodeComponent';

const InterviewComponent = () => {
  const { darkMode } = useContext(DarkModeContext);

  return (
    <Container fluid className={`iv-container ${darkMode ? 'iv-dark' : 'iv-light'}`}>
      <div className='iv-header'>
        <h1 className='iv-title'>
          <i className='fas fa-brain' /> Interview Prep
        </h1>
        <p className='iv-subtitle'>
          React · TypeScript · Angular · .NET/C#
        </p>
      </div>

      <Tabs defaultActiveKey='qa' className='iv-tabs mb-4'>
        <Tab eventKey='qa' title='Q & A'>
          <InterviewQAComponent darkMode={darkMode} />
        </Tab>
        <Tab eventKey='leetcode' title='LeetCode'>
          <InterviewLeetCodeComponent darkMode={darkMode} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default InterviewComponent;
