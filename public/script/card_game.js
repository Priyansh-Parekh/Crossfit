const cards = [
  {
    "player": "Virat Kohli",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=630",
    "stats": {
      "batting": 70,
      "bowling": 33,
      "fielding": 66,
      "power": 89
    }
  },
  {
    "player": "Rohit Sharma",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2943",
    "stats": {
      "batting": 87,
      "bowling": 100,
      "fielding": 86,
      "power": 100
    }
  },
  {
    "player": "MS Dhoni",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6231",
    "stats": {
      "batting": 50,
      "bowling": 79,
      "fielding": 66,
      "power": 97
    }
  },
  {
    "player": "Hardik Pandya",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3211",
    "stats": {
      "batting": 65,
      "bowling": 77,
      "fielding": 77,
      "power": 74
    }
  },
  {
    "player": "KL Rahul",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1198",
    "stats": {
      "batting": 92,
      "bowling": 79,
      "fielding": 89,
      "power": 68
    }
  },
  {
    "player": "Ravindra Jadeja",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6467",
    "stats": {
      "batting": 62,
      "bowling": 88,
      "fielding": 70,
      "power": 66
    }
  },
  {
    "player": "Shubman Gill",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6309",
    "stats": {
      "batting": 55,
      "bowling": 33,
      "fielding": 71,
      "power": 82
    }
  },
  {
    "player": "Rishabh Pant",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1719",
    "stats": {
      "batting": 76,
      "bowling": 31,
      "fielding": 82,
      "power": 97
    }
  },
  {
    "player": "Jasprit Bumrah",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6387",
    "stats": {
      "batting": 68,
      "bowling": 34,
      "fielding": 99,
      "power": 96
    }
  },
  {
    "player": "Shreyas Iyer",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9897",
    "stats": {
      "batting": 77,
      "bowling": 97,
      "fielding": 78,
      "power": 78
    }
  },
  {
    "player": "Ben Stokes",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2324",
    "stats": {
      "batting": 61,
      "bowling": 71,
      "fielding": 61,
      "power": 60
    }
  },
  {
    "player": "Joe Root",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8010",
    "stats": {
      "batting": 59,
      "bowling": 88,
      "fielding": 86,
      "power": 77
    }
  },
  {
    "player": "David Warner",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8469",
    "stats": {
      "batting": 88,
      "bowling": 31,
      "fielding": 69,
      "power": 65
    }
  },
  {
    "player": "Steve Smith",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6338",
    "stats": {
      "batting": 65,
      "bowling": 76,
      "fielding": 77,
      "power": 66
    }
  },
  {
    "player": "Pat Cummins",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8868",
    "stats": {
      "batting": 96,
      "bowling": 79,
      "fielding": 97,
      "power": 72
    }
  },
  {
    "player": "Kane Williamson",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8842",
    "stats": {
      "batting": 65,
      "bowling": 52,
      "fielding": 75,
      "power": 69
    }
  },
  {
    "player": "Trent Boult",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1329",
    "stats": {
      "batting": 79,
      "bowling": 55,
      "fielding": 97,
      "power": 63
    }
  },
  {
    "player": "Tim Southee",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5523",
    "stats": {
      "batting": 85,
      "bowling": 89,
      "fielding": 87,
      "power": 84
    }
  },
  {
    "player": "Tom Latham",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2933",
    "stats": {
      "batting": 64,
      "bowling": 34,
      "fielding": 87,
      "power": 92
    }
  },
  {
    "player": "Josh Hazlewood",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8365",
    "stats": {
      "batting": 62,
      "bowling": 85,
      "fielding": 91,
      "power": 71
    }
  },
  {
    "player": "Mitchell Starc",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=649",
    "stats": {
      "batting": 59,
      "bowling": 67,
      "fielding": 81,
      "power": 76
    }
  },
  {
    "player": "Marnus Labuschagne",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3039",
    "stats": {
      "batting": 79,
      "bowling": 62,
      "fielding": 62,
      "power": 97
    }
  },
  {
    "player": "Marcus Stoinis",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1722",
    "stats": {
      "batting": 94,
      "bowling": 34,
      "fielding": 75,
      "power": 93
    }
  },
  {
    "player": "Mohammed Shami",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8175",
    "stats": {
      "batting": 63,
      "bowling": 52,
      "fielding": 60,
      "power": 65
    }
  },
  {
    "player": "Yuzvendra Chahal",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8540",
    "stats": {
      "batting": 93,
      "bowling": 95,
      "fielding": 84,
      "power": 71
    }
  },
  {
    "player": "Kuldeep Yadav",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9221",
    "stats": {
      "batting": 99,
      "bowling": 46,
      "fielding": 79,
      "power": 92
    }
  },
  {
    "player": "Axar Patel",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1654",
    "stats": {
      "batting": 53,
      "bowling": 54,
      "fielding": 65,
      "power": 97
    }
  },
  {
    "player": "Dinesh Karthik",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9356",
    "stats": {
      "batting": 83,
      "bowling": 35,
      "fielding": 64,
      "power": 91
    }
  },
  {
    "player": "Ishan Kishan",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=60",
    "stats": {
      "batting": 95,
      "bowling": 100,
      "fielding": 76,
      "power": 64
    }
  },
  {
    "player": "Rahul Tripathi",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4525",
    "stats": {
      "batting": 64,
      "bowling": 92,
      "fielding": 93,
      "power": 74
    }
  },
  {
    "player": "Umran Malik",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4852",
    "stats": {
      "batting": 55,
      "bowling": 53,
      "fielding": 100,
      "power": 62
    }
  },
  {
    "player": "Arshdeep Singh",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4123",
    "stats": {
      "batting": 56,
      "bowling": 91,
      "fielding": 73,
      "power": 91
    }
  },
  {
    "player": "Washington Sundar",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1049",
    "stats": {
      "batting": 81,
      "bowling": 39,
      "fielding": 75,
      "power": 83
    }
  },
  {
    "player": "Deepak Chahar",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4466",
    "stats": {
      "batting": 67,
      "bowling": 74,
      "fielding": 79,
      "power": 61
    }
  },
  {
    "player": "Suryakumar Yadav",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8450",
    "stats": {
      "batting": 96,
      "bowling": 39,
      "fielding": 84,
      "power": 60
    }
  },
  {
    "player": "Sanju Samson",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4321",
    "stats": {
      "batting": 97,
      "bowling": 60,
      "fielding": 92,
      "power": 73
    }
  },
  {
    "player": "Deepak Hooda",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6202",
    "stats": {
      "batting": 81,
      "bowling": 59,
      "fielding": 97,
      "power": 91
    }
  },
  {
    "player": "Ruturaj Gaikwad",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3188",
    "stats": {
      "batting": 83,
      "bowling": 80,
      "fielding": 91,
      "power": 61
    }
  },
  {
    "player": "Prithvi Shaw",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5030",
    "stats": {
      "batting": 92,
      "bowling": 68,
      "fielding": 86,
      "power": 83
    }
  },
  {
    "player": "Shivam Dube",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6131",
    "stats": {
      "batting": 93,
      "bowling": 51,
      "fielding": 74,
      "power": 89
    }
  },
  {
    "player": "Mayank Agarwal",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1448",
    "stats": {
      "batting": 95,
      "bowling": 73,
      "fielding": 78,
      "power": 97
    }
  },
  {
    "player": "Abhishek Sharma",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9629",
    "stats": {
      "batting": 87,
      "bowling": 55,
      "fielding": 61,
      "power": 80
    }
  },
  {
    "player": "Varun Chakravarthy",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5394",
    "stats": {
      "batting": 56,
      "bowling": 85,
      "fielding": 64,
      "power": 61
    }
  },
  {
    "player": "T Natarajan",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6801",
    "stats": {
      "batting": 74,
      "bowling": 30,
      "fielding": 87,
      "power": 78
    }
  },
  {
    "player": "Shardul Thakur",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9668",
    "stats": {
      "batting": 69,
      "bowling": 82,
      "fielding": 75,
      "power": 82
    }
  },
  {
    "player": "Bhuvneshwar Kumar",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2139",
    "stats": {
      "batting": 79,
      "bowling": 78,
      "fielding": 72,
      "power": 72
    }
  },
  {
    "player": "Navdeep Saini",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1767",
    "stats": {
      "batting": 86,
      "bowling": 34,
      "fielding": 83,
      "power": 82
    }
  },
  {
    "player": "Harshal Patel",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6852",
    "stats": {
      "batting": 67,
      "bowling": 81,
      "fielding": 83,
      "power": 93
    }
  },
  {
    "player": "Ravi Bishnoi",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1359",
    "stats": {
      "batting": 85,
      "bowling": 82,
      "fielding": 88,
      "power": 98
    }
  },
  {
    "player": "Devdutt Padikkal",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1411",
    "stats": {
      "batting": 95,
      "bowling": 91,
      "fielding": 71,
      "power": 65
    }
  },
  {
    "player": "Nitish Rana",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2083",
    "stats": {
      "batting": 70,
      "bowling": 37,
      "fielding": 66,
      "power": 69
    }
  },
  {
    "player": "Krishnappa Gowtham",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1428",
    "stats": {
      "batting": 75,
      "bowling": 75,
      "fielding": 61,
      "power": 74
    }
  },
  {
    "player": "Rahul Chahar",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1270",
    "stats": {
      "batting": 96,
      "bowling": 88,
      "fielding": 81,
      "power": 89
    }
  },
  {
    "player": "Venkatesh Iyer",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4150",
    "stats": {
      "batting": 97,
      "bowling": 73,
      "fielding": 66,
      "power": 86
    }
  },
  {
    "player": "Wriddhiman Saha",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4009",
    "stats": {
      "batting": 61,
      "bowling": 62,
      "fielding": 91,
      "power": 86
    }
  },
  {
    "player": "Ajinkya Rahane",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6274",
    "stats": {
      "batting": 88,
      "bowling": 89,
      "fielding": 97,
      "power": 100
    }
  },
  {
    "player": "Cheteshwar Pujara",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9437",
    "stats": {
      "batting": 87,
      "bowling": 36,
      "fielding": 69,
      "power": 79
    }
  },
  {
    "player": "Manish Pandey",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3425",
    "stats": {
      "batting": 73,
      "bowling": 77,
      "fielding": 76,
      "power": 70
    }
  },
  {
    "player": "Karun Nair",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8802",
    "stats": {
      "batting": 89,
      "bowling": 30,
      "fielding": 93,
      "power": 72
    }
  },
  {
    "player": "Hanuma Vihari",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1074",
    "stats": {
      "batting": 59,
      "bowling": 94,
      "fielding": 89,
      "power": 62
    }
  },
  {
    "player": "Vijay Shankar",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9692",
    "stats": {
      "batting": 76,
      "bowling": 33,
      "fielding": 90,
      "power": 76
    }
  },
  {
    "player": "Parthiv Patel",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1361",
    "stats": {
      "batting": 95,
      "bowling": 59,
      "fielding": 83,
      "power": 82
    }
  },
  {
    "player": "Ambati Rayudu",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5062",
    "stats": {
      "batting": 77,
      "bowling": 81,
      "fielding": 86,
      "power": 87
    }
  },
  {
    "player": "Mohit Sharma",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6608",
    "stats": {
      "batting": 87,
      "bowling": 35,
      "fielding": 93,
      "power": 68
    }
  },
  {
    "player": "Adam Zampa",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4083",
    "stats": {
      "batting": 81,
      "bowling": 90,
      "fielding": 100,
      "power": 80
    }
  },
  {
    "player": "Travis Head",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2600",
    "stats": {
      "batting": 75,
      "bowling": 30,
      "fielding": 84,
      "power": 98
    }
  },
  {
    "player": "Matt Henry",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4049",
    "stats": {
      "batting": 93,
      "bowling": 70,
      "fielding": 84,
      "power": 87
    }
  },
  {
    "player": "Mitchell Marsh",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6327",
    "stats": {
      "batting": 67,
      "bowling": 58,
      "fielding": 61,
      "power": 65
    }
  },
  {
    "player": "Josh Inglis",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9298",
    "stats": {
      "batting": 92,
      "bowling": 99,
      "fielding": 71,
      "power": 93
    }
  },
  {
    "player": "Ashton Agar",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7780",
    "stats": {
      "batting": 74,
      "bowling": 65,
      "fielding": 73,
      "power": 67
    }
  },
  {
    "player": "Daryl Mitchell",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3747",
    "stats": {
      "batting": 92,
      "bowling": 35,
      "fielding": 98,
      "power": 91
    }
  },
  {
    "player": "Glenn Maxwell",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6836",
    "stats": {
      "batting": 85,
      "bowling": 61,
      "fielding": 80,
      "power": 72
    }
  },
  {
    "player": "James Neesham",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7465",
    "stats": {
      "batting": 61,
      "bowling": 99,
      "fielding": 100,
      "power": 84
    }
  },
  {
    "player": "Martin Guptill",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1434",
    "stats": {
      "batting": 69,
      "bowling": 38,
      "fielding": 73,
      "power": 87
    }
  },
  {
    "player": "Mitchell Santner",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1770",
    "stats": {
      "batting": 98,
      "bowling": 42,
      "fielding": 86,
      "power": 97
    }
  },
  {
    "player": "Sam Curran",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7661",
    "stats": {
      "batting": 84,
      "bowling": 82,
      "fielding": 96,
      "power": 90
    }
  },
  {
    "player": "Tom Curran",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2525",
    "stats": {
      "batting": 96,
      "bowling": 35,
      "fielding": 87,
      "power": 80
    }
  },
  {
    "player": "Jofra Archer",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6843",
    "stats": {
      "batting": 89,
      "bowling": 63,
      "fielding": 67,
      "power": 66
    }
  },
  {
    "player": "Chris Woakes",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7287",
    "stats": {
      "batting": 55,
      "bowling": 37,
      "fielding": 75,
      "power": 85
    }
  },
  {
    "player": "Mark Wood",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5791",
    "stats": {
      "batting": 86,
      "bowling": 61,
      "fielding": 66,
      "power": 67
    }
  },
  {
    "player": "Dawid Malan",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5624",
    "stats": {
      "batting": 89,
      "bowling": 99,
      "fielding": 81,
      "power": 95
    }
  },
  {
    "player": "Jonny Bairstow",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5442",
    "stats": {
      "batting": 100,
      "bowling": 40,
      "fielding": 85,
      "power": 76
    }
  },
  {
    "player": "Jos Buttler",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7432",
    "stats": {
      "batting": 50,
      "bowling": 68,
      "fielding": 81,
      "power": 60
    }
  },
  {
    "player": "Liam Livingstone",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8522",
    "stats": {
      "batting": 75,
      "bowling": 75,
      "fielding": 62,
      "power": 67
    }
  },
  {
    "player": "Harry Brook",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1102",
    "stats": {
      "batting": 71,
      "bowling": 43,
      "fielding": 96,
      "power": 64
    }
  },
  {
    "player": "Reece Topley",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7177",
    "stats": {
      "batting": 75,
      "bowling": 79,
      "fielding": 93,
      "power": 98
    }
  },
  {
    "player": "Lockie Ferguson",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8828",
    "stats": {
      "batting": 98,
      "bowling": 39,
      "fielding": 80,
      "power": 96
    }
  },
  {
    "player": "Henry Nicholls",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7835",
    "stats": {
      "batting": 69,
      "bowling": 54,
      "fielding": 78,
      "power": 93
    }
  },
  {
    "player": "Finn Allen",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4137",
    "stats": {
      "batting": 90,
      "bowling": 87,
      "fielding": 60,
      "power": 87
    }
  },
  {
    "player": "Tom Blundell",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3193",
    "stats": {
      "batting": 78,
      "bowling": 52,
      "fielding": 73,
      "power": 86
    }
  },
  {
    "player": "Michael Bracewell",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6871",
    "stats": {
      "batting": 87,
      "bowling": 83,
      "fielding": 98,
      "power": 73
    }
  },
  {
    "player": "Sean Abbott",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9575",
    "stats": {
      "batting": 58,
      "bowling": 55,
      "fielding": 98,
      "power": 100
    }
  },
  {
    "player": "Nathan Ellis",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9634",
    "stats": {
      "batting": 81,
      "bowling": 75,
      "fielding": 63,
      "power": 65
    }
  },
  {
    "player": "Daniel Sams",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9014",
    "stats": {
      "batting": 66,
      "bowling": 51,
      "fielding": 62,
      "power": 83
    }
  },
  {
    "player": "Matthew Wade",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4114",
    "stats": {
      "batting": 99,
      "bowling": 31,
      "fielding": 88,
      "power": 80
    }
  },
  {
    "player": "Cameron Green",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2461",
    "stats": {
      "batting": 58,
      "bowling": 64,
      "fielding": 95,
      "power": 71
    }
  },
  {
    "player": "David Willey",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6254",
    "stats": {
      "batting": 94,
      "bowling": 47,
      "fielding": 99,
      "power": 84
    }
  },
  {
    "player": "Jason Roy",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7662",
    "stats": {
      "batting": 91,
      "bowling": 33,
      "fielding": 93,
      "power": 91
    }
  },
  {
    "player": "Phil Salt",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2547",
    "stats": {
      "batting": 94,
      "bowling": 55,
      "fielding": 73,
      "power": 97
    }
  },
  {
    "player": "Ben Duckett",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2919",
    "stats": {
      "batting": 87,
      "bowling": 65,
      "fielding": 68,
      "power": 74
    }
  },
  {
    "player": "Craig Overton",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2794",
    "stats": {
      "batting": 59,
      "bowling": 52,
      "fielding": 85,
      "power": 60
    }
  },
  {
    "player": "Brydon Carse",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8113",
    "stats": {
      "batting": 78,
      "bowling": 92,
      "fielding": 69,
      "power": 68
    }
  },
  {
    "player": "Keemo Paul",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8892",
    "stats": {
      "batting": 76,
      "bowling": 64,
      "fielding": 90,
      "power": 87
    }
  },
  {
    "player": "Roston Chase",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3718",
    "stats": {
      "batting": 99,
      "bowling": 37,
      "fielding": 61,
      "power": 64
    }
  },
  {
    "player": "Shimron Hetmyer",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9867",
    "stats": {
      "batting": 79,
      "bowling": 69,
      "fielding": 62,
      "power": 79
    }
  },
  {
    "player": "Evin Lewis",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7741",
    "stats": {
      "batting": 53,
      "bowling": 69,
      "fielding": 85,
      "power": 96
    }
  },
  {
    "player": "Brandon King",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5839",
    "stats": {
      "batting": 99,
      "bowling": 74,
      "fielding": 64,
      "power": 72
    }
  },
  {
    "player": "Kyle Mayers",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6558",
    "stats": {
      "batting": 82,
      "bowling": 91,
      "fielding": 79,
      "power": 92
    }
  },
  {
    "player": "Shai Hope",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5666",
    "stats": {
      "batting": 84,
      "bowling": 43,
      "fielding": 64,
      "power": 93
    }
  },
  {
    "player": "Romario Shepherd",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8662",
    "stats": {
      "batting": 91,
      "bowling": 45,
      "fielding": 67,
      "power": 62
    }
  },
  {
    "player": "Alzarri Joseph",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8778",
    "stats": {
      "batting": 75,
      "bowling": 38,
      "fielding": 84,
      "power": 81
    }
  },
  {
    "player": "Obed McCoy",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5066",
    "stats": {
      "batting": 60,
      "bowling": 72,
      "fielding": 82,
      "power": 76
    }
  },
  {
    "player": "Akeal Hosein",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9099",
    "stats": {
      "batting": 69,
      "bowling": 47,
      "fielding": 69,
      "power": 70
    }
  },
  {
    "player": "Nicholas Pooran",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8902",
    "stats": {
      "batting": 61,
      "bowling": 66,
      "fielding": 70,
      "power": 98
    }
  },
  {
    "player": "Andre Fletcher",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8404",
    "stats": {
      "batting": 96,
      "bowling": 59,
      "fielding": 99,
      "power": 65
    }
  },
  {
    "player": "Dinesh Chandimal",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1497",
    "stats": {
      "batting": 59,
      "bowling": 82,
      "fielding": 71,
      "power": 91
    }
  },
  {
    "player": "Kusal Mendis",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1787",
    "stats": {
      "batting": 72,
      "bowling": 70,
      "fielding": 84,
      "power": 73
    }
  },
  {
    "player": "Charith Asalanka",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8823",
    "stats": {
      "batting": 53,
      "bowling": 36,
      "fielding": 86,
      "power": 77
    }
  },
  {
    "player": "Pathum Nissanka",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5771",
    "stats": {
      "batting": 51,
      "bowling": 45,
      "fielding": 91,
      "power": 70
    }
  },
  {
    "player": "Wanindu Hasaranga",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4055",
    "stats": {
      "batting": 92,
      "bowling": 78,
      "fielding": 73,
      "power": 62
    }
  },
  {
    "player": "Maheesh Theekshana",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4105",
    "stats": {
      "batting": 54,
      "bowling": 69,
      "fielding": 84,
      "power": 86
    }
  },
  {
    "player": "Dasun Shanaka",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5958",
    "stats": {
      "batting": 79,
      "bowling": 67,
      "fielding": 69,
      "power": 64
    }
  },
  {
    "player": "Chamika Karunaratne",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9438",
    "stats": {
      "batting": 96,
      "bowling": 80,
      "fielding": 83,
      "power": 98
    }
  },
  {
    "player": "Dhananjaya de Silva",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6653",
    "stats": {
      "batting": 68,
      "bowling": 100,
      "fielding": 62,
      "power": 80
    }
  },
  {
    "player": "Lahiru Kumara",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1143",
    "stats": {
      "batting": 80,
      "bowling": 54,
      "fielding": 75,
      "power": 91
    }
  },
  {
    "player": "Angelo Mathews",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4839",
    "stats": {
      "batting": 81,
      "bowling": 90,
      "fielding": 83,
      "power": 90
    }
  },
  {
    "player": "Niroshan Dickwella",
    "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4108",
    "stats": {
      "batting": 55,
      "bowling": 61,
      "fielding": 94,
      "power": 64
    }
  }
];


let p1Deck = [], p2Deck = [], p1Score = 0, p2Score = 0, currentPlayer = 1, currentCards = {};

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function updateUI() {
    const p1countElem = document.getElementById("p1count");
    const p2countElem = document.getElementById("p2count");
    const scoreElem = document.getElementById("score");

    if (p1countElem) p1countElem.textContent = p1Deck.length;
    if (p2countElem) p2countElem.textContent = p2Deck.length;
    if (scoreElem) scoreElem.textContent = `${loggedInName}: ${p1Score} | computer: ${p2Score}`;
}

function startGame() {
    shuffle(cards);
    p1Deck = cards.slice(0, 20);
    p2Deck = cards.slice(20, 40);
    updateUI();
    nextTurn();
}

function restartGame() {
    p1Deck = [];
    p2Deck = [];
    p1Score = 0;
    p2Score = 0;
    currentPlayer = 1;
    currentCards = {};

    shuffle(cards);
    p1Deck = cards.slice(0, 20);
    p2Deck = cards.slice(20, 40);

    updateUI();
    nextTurn();
}

function nextTurn() {
    updateUI();

    if (p1Deck.length === 0 || p2Deck.length === 0) {
        const result = p1Score > p2Score
            ? "Player 1 Wins!"
            : p2Score > p1Score
                ? "Player 2 Wins!"
                : "It's a Draw!";

        setTimeout(() => {
            alert("Game Over!\n" + result + "\nRestarting...");
            restartGame();
        }, 1000);
        return;
    }

    const p1 = p1Deck.shift();
    const p2 = p2Deck.shift();
    currentCards = { p1, p2 };

    const card1 = document.getElementById("card1");
    const card2 = document.getElementById("card2");
    if (card1) card1.innerHTML = "";
    if (card2) card2.innerHTML = "";

    if (card1) {
        const p1Card = createCard(p1, true);
        card1.appendChild(p1Card);
    }
    if (card2) {
        const p2Card = createCard(p2, false);
        card2.appendChild(p2Card);
    }

    const buttons = document.getElementById("buttons");
    if (buttons) buttons.innerHTML = "";

    const stats = Object.keys(p1.stats);

    if (currentPlayer === 1) {
        // Player 1 turn – show buttons for stat selection
        if (buttons) {
            stats.forEach(stat => {
                const btn = document.createElement("button");
                btn.textContent = stat;
                btn.onclick = () => compareStat(stat);
                buttons.appendChild(btn);
            });
        }
    } else {
        // Player 2 (AI) turn – auto pick stat, then compare
        setTimeout(() => {
            const stat = stats[Math.floor(Math.random() * stats.length)];
            compareStat(stat);
        }, 1000); // Delay before AI picks stat
    }
}

function compareStat(stat) {
    const card1 = document.querySelector("#card1 .card-inner");
    const card2 = document.querySelector("#card2 .card-inner");
    const { p1, p2 } = currentCards;
    const buttons = document.getElementById("buttons");

    if (buttons) buttons.innerHTML = `<strong>${stat.toUpperCase()} chosen!</strong>`;

    // Clear previous highlights
    document.querySelectorAll('.card').forEach(c => c.classList.remove('winner'));

    if (currentPlayer === 1) {
        if (card2) card2.style.transform = "rotateY(180deg)";

        setTimeout(() => {
            if (card1) card1.style.transform = "rotateY(180deg)";

            setTimeout(() => {
                handleComparison(stat, p1, p2);
            }, 1000); // Wait after flipping Player 1's card
        }, 700); // Delay before flipping Player 1's card

    } else {
        if (card2) card2.style.transform = "rotateY(180deg)";

        setTimeout(() => {
            if (card1) card1.style.transform = "rotateY(180deg)";

            setTimeout(() => {
                handleComparison(stat, p1, p2);
            }, 1000); // Wait after both cards are flipped
        }, 700); // Delay between card flips
    }
}

function handleComparison(stat, p1, p2) {
    const card1Elem = document.getElementById("card1");
    const card2Elem = document.getElementById("card2");

    if (p1.stats[stat] > p2.stats[stat]) {
        if (card1Elem) card1Elem.classList.add("winner");
        p1Score++;
        p1Deck.push(p1, p2);
        currentPlayer = 1;
    } else if (p2.stats[stat] > p1.stats[stat]) {
        if (card2Elem) card2Elem.classList.add("winner");
        p2Score++;
        p2Deck.push(p1, p2);
        currentPlayer = 2;
    } else {
        // Tie
        p1Deck.push(p1);
        p2Deck.push(p2);
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    }

    // Wait and go to next turn
    setTimeout(() => {
        document.querySelectorAll('.card').forEach(c => c.classList.remove('winner'));
        nextTurn();
    }, 1500);
}

function createCard(card, revealed) {
    const cardDiv = document.createElement("div");
    cardDiv.className = "card-inner";

    const front = document.createElement("div");
    front.className = "card-front";
    front.innerHTML = `<h2>Cricket Card</h2>`;

    const back = document.createElement("div");
    back.className = "card-back";
    back.innerHTML = `
    <div class="player-img" style="background-image: url('/images/${card.player}.jpeg')"></div>
    <h3>${card.player}</h3>
    ${Object.entries(card.stats).map(([k, v]) => `<div class='stat'><strong>${k}:</strong> ${v}</div>`).join("")}
  `;

    cardDiv.appendChild(front);
    cardDiv.appendChild(back);

    if (revealed && currentPlayer === 1) {
        setTimeout(() => {
            cardDiv.style.transform = "rotateY(180deg)";
        }, 600);
    }

    const wrapper = document.createElement("div");
    wrapper.className = "card";
    wrapper.appendChild(cardDiv);
    return wrapper;
}

// ---------------------------------------
// Start the game after DOM loaded
document.addEventListener("DOMContentLoaded", () => {
    startGame();
});
