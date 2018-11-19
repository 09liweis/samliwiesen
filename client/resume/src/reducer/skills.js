const initialSkills = [
    {
        category: 'Basic',
        techs: [
            {
                name: 'HTML5',
                color: '#f16528'
            },
            {
                name: 'CSS3',
                color: '#0e72b8'
            },
            {
                name: 'JS(ES6)',
                color: '#fadf1c'
            }
        ]
    },
    {
        category: 'CSS Framework',
        techs: [
            {
                name: 'Bootstrap',
                color: '#60408e'
            },
            {
                name: 'Bulma',
                color: '#04d1b2'
            }
        ]
    },
    {
        category: 'JS Framework',
        techs: [
            {
                name: 'ReactJS',
                color: '#60dafb'
            },
            {
                name: 'VueJs',
                color: '#01bf7f'
            },
            {
                name: 'Angular',
                color: '#c40030'
            },
        ]
    },
    {
        category: 'Package Manager',
        techs: [
            {
                name: 'Webpack',
                color: '#1b78c0'
            },
            {
                name: 'npm',
                color: '#cc0000'
            }
        ]
    },
    {
        category: 'Version Control',
        techs: [
            {
                name: 'GitHub',
                color: '#010101'
            },
            {
                name: 'Bitbucket',
                color: '#284870'
            }
        ]
    },
    {
        category: 'Project Management Tools',
        techs: [
            {
                name: 'Asana',
                color: '#fc7865'
            },
            {
                name: 'Trello',
                color: '#017fcb'
            },
            {
                name: 'JIRA',
                color: '#003365'
            }
        ]
    },
    {
        category: 'Backend Framework',
        techs: [
            {
                name: 'Laravel',
                color: '#fb4f3c'
            },
            {
                name: 'Django',
                color: '#0e3e2e'
            },
            {
                name: 'Ruby on Rails',
                color: '#cc0000'
            },
            {
                name: 'Node.js',
                color: '#7fbe00'
            }
        ]
    },
    {
        category: 'Programming Language',
        techs: [
            {
                name: 'PHP',
                color: '#777ab3'
            },
            {
                name: 'Python',
                color: '#306897'
            }
        ]
    }
];

const skills = (state = initialSkills, action) => {
    return state;
};
export default skills;