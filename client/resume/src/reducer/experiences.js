const initialExperiences = [
    {
        company: 'Canada Goose',
        title: 'Front End Developer',
        date: 'May 2017 - Present',
        duty: []
    },
    {
        company: 'JMIR Publications',
        title: 'Web Developer',
        date: 'Aug  2017 - April 2018',
        duty: [
            'Create REST web services and implement restful api with Ajax',
            'Build interactive user interface with angularJS and jQuery',
            'Work with designer to create and implement modernized user interface with HTML5/CSS3',
            'Successfully created web pages and test on BrowserStack and make sure they are compatible with popular web browsers',
            'Train and help new employees to be familiar with project structure'
        ]
    },
    {
        company: 'Web Canada',
        title: 'Web Developer',
        date: 'Oct 2013 - July 2016',
        duty: [
            'Took the initiative and a self-directed approach to learning to understand and build complex interact UIs with ReactJS',
            'Translate photoshop designs into pixel perfect HTML5/CSS3',
            'Build maintainable and scalable CSS with BEM architecture pattern',
            'Help build platforms that enable clients to create purposeful, goal-oriented websites to support their marketing needs',
            'Successfully developed and maintained CMS web application for Starwood Hotels and Resorts, Design Hotels and New Castle Hotel brands',
            'Develop web application using Google Map API and also implemented AutoNavi Map to make sure users in China are able to access map features (note that the majority of Google API’s have been banned in China, fortifying the need for alternate APIs)'
        ]
    }
];

const experiences = (state = initialExperiences, action) => {
    return state;
};

export default experiences;