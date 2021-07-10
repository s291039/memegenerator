import dayjs from 'dayjs';

const FAKE_TASKS = `
[
	{
		"id": 0,
		"description": "Complete Lab 3",
		"important": true,
		"is_private": false,
		"deadline": 1616419800,
		"checked" : true
	},
	{
		"id": 1,
		"description": "Read a good book",
		"important": false,
		"is_private": true,
		"deadline": -1,
		"checked" : false
	},
	{
		"id": 2,
		"description": "Burn the city",
		"important": true,
		"is_private": true,
		"deadline": 3376681200,
		"checked" : false
	},
	{
		"id": 3,
		"description": "Test today",
		"important": false,
		"is_private": false,
		"deadline": "${dayjs().unix()}",
		"checked" : false
	},
	{
		"id": 4,
		"description": "Test tomorrow",
		"important": false,
		"is_private": false,
		"deadline": "${dayjs().add(1, 'day').unix()}",
		"checked" : false
	},
	{
		"id": 5,
		"description": "Complete BigLab1",
		"important": true,
		"is_private": false,
		"deadline": 1620597540,
		"checked" : true
	},
	{
		"id": 6,
		"description": "Test the day after tomorrow",
		"important": false,
		"is_private": false,
		"deadline": "${dayjs().add(2, 'day').unix()}",
		"checked" : false
	},
	{
		"id": 7,
		"description": "Try to meditate",
		"important": false,
		"is_private": true,
		"deadline": 1625004000,
		"checked" : false
	},
	{
		"id": 8,
		"description": "Complete BigLab2",
		"important": true,
		"is_private": false,
		"deadline": 1623016740,
		"checked" : false
	},
	{
		"id": 9,
		"description": "Live the moment",
		"important": true,
		"is_private": true,
		"deadline": "${dayjs().unix()}",
		"checked" : false
	}
]
`;

export default FAKE_TASKS;
