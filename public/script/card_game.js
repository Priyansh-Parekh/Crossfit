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
        "player": "Babar Azam",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6165",
        "stats": {
            "batting": 90,
            "bowling": 76,
            "fielding": 61,
            "power": 88
        }
    },
    {
        "player": "Mohammad Rizwan",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4249",
        "stats": {
            "batting": 59,
            "bowling": 98,
            "fielding": 95,
            "power": 82
        }
    },
    {
        "player": "Shaheen Afridi",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9028",
        "stats": {
            "batting": 68,
            "bowling": 71,
            "fielding": 72,
            "power": 94
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
        "player": "Fakhar Zaman",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3105",
        "stats": {
            "batting": 93,
            "bowling": 82,
            "fielding": 95,
            "power": 74
        }
    },
    {
        "player": "Imam-ul-Haq",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7267",
        "stats": {
            "batting": 99,
            "bowling": 57,
            "fielding": 86,
            "power": 67
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
        "player": "Virat Kohli (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2425",
        "stats": {
            "batting": 66,
            "bowling": 58,
            "fielding": 81,
            "power": 98
        }
    },
    {
        "player": "Rohit Sharma (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1446",
        "stats": {
            "batting": 89,
            "bowling": 54,
            "fielding": 85,
            "power": 60
        }
    },
    {
        "player": "MS Dhoni (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7878",
        "stats": {
            "batting": 57,
            "bowling": 79,
            "fielding": 95,
            "power": 62
        }
    },
    {
        "player": "Hardik Pandya (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8756",
        "stats": {
            "batting": 75,
            "bowling": 36,
            "fielding": 92,
            "power": 87
        }
    },
    {
        "player": "KL Rahul (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1718",
        "stats": {
            "batting": 90,
            "bowling": 52,
            "fielding": 99,
            "power": 87
        }
    },
    {
        "player": "Ravindra Jadeja (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=639",
        "stats": {
            "batting": 71,
            "bowling": 95,
            "fielding": 65,
            "power": 77
        }
    },
    {
        "player": "Shubman Gill (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=769",
        "stats": {
            "batting": 85,
            "bowling": 90,
            "fielding": 98,
            "power": 90
        }
    },
    {
        "player": "Rishabh Pant (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4393",
        "stats": {
            "batting": 83,
            "bowling": 71,
            "fielding": 97,
            "power": 91
        }
    },
    {
        "player": "Jasprit Bumrah (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4315",
        "stats": {
            "batting": 76,
            "bowling": 71,
            "fielding": 69,
            "power": 83
        }
    },
    {
        "player": "Shreyas Iyer (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5695",
        "stats": {
            "batting": 52,
            "bowling": 56,
            "fielding": 76,
            "power": 98
        }
    },
    {
        "player": "Babar Azam (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3973",
        "stats": {
            "batting": 77,
            "bowling": 82,
            "fielding": 100,
            "power": 79
        }
    },
    {
        "player": "Mohammad Rizwan (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=378",
        "stats": {
            "batting": 100,
            "bowling": 39,
            "fielding": 86,
            "power": 88
        }
    },
    {
        "player": "Shaheen Afridi (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8994",
        "stats": {
            "batting": 87,
            "bowling": 31,
            "fielding": 71,
            "power": 63
        }
    },
    {
        "player": "Ben Stokes (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7974",
        "stats": {
            "batting": 52,
            "bowling": 35,
            "fielding": 83,
            "power": 93
        }
    },
    {
        "player": "Joe Root (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8536",
        "stats": {
            "batting": 99,
            "bowling": 82,
            "fielding": 78,
            "power": 98
        }
    },
    {
        "player": "David Warner (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7931",
        "stats": {
            "batting": 59,
            "bowling": 90,
            "fielding": 100,
            "power": 88
        }
    },
    {
        "player": "Steve Smith (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3485",
        "stats": {
            "batting": 88,
            "bowling": 38,
            "fielding": 92,
            "power": 84
        }
    },
    {
        "player": "Pat Cummins (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1933",
        "stats": {
            "batting": 92,
            "bowling": 62,
            "fielding": 81,
            "power": 61
        }
    },
    {
        "player": "Kane Williamson (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3286",
        "stats": {
            "batting": 80,
            "bowling": 52,
            "fielding": 75,
            "power": 78
        }
    },
    {
        "player": "Trent Boult (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8470",
        "stats": {
            "batting": 90,
            "bowling": 40,
            "fielding": 98,
            "power": 97
        }
    },
    {
        "player": "Fakhar Zaman (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5625",
        "stats": {
            "batting": 90,
            "bowling": 43,
            "fielding": 76,
            "power": 82
        }
    },
    {
        "player": "Imam-ul-Haq (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7603",
        "stats": {
            "batting": 68,
            "bowling": 100,
            "fielding": 89,
            "power": 98
        }
    },
    {
        "player": "Tim Southee (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8752",
        "stats": {
            "batting": 83,
            "bowling": 83,
            "fielding": 85,
            "power": 88
        }
    },
    {
        "player": "Tom Latham (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7808",
        "stats": {
            "batting": 68,
            "bowling": 66,
            "fielding": 67,
            "power": 77
        }
    },
    {
        "player": "Josh Hazlewood (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1337",
        "stats": {
            "batting": 91,
            "bowling": 43,
            "fielding": 74,
            "power": 85
        }
    },
    {
        "player": "Mitchell Starc (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3193",
        "stats": {
            "batting": 95,
            "bowling": 53,
            "fielding": 65,
            "power": 61
        }
    },
    {
        "player": "Marnus Labuschagne (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6159",
        "stats": {
            "batting": 60,
            "bowling": 83,
            "fielding": 96,
            "power": 83
        }
    },
    {
        "player": "Marcus Stoinis (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4942",
        "stats": {
            "batting": 64,
            "bowling": 56,
            "fielding": 87,
            "power": 92
        }
    },
    {
        "player": "Mohammed Shami (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5655",
        "stats": {
            "batting": 94,
            "bowling": 81,
            "fielding": 66,
            "power": 100
        }
    },
    {
        "player": "Yuzvendra Chahal (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1916",
        "stats": {
            "batting": 100,
            "bowling": 62,
            "fielding": 86,
            "power": 79
        }
    },
    {
        "player": "Kuldeep Yadav (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5581",
        "stats": {
            "batting": 79,
            "bowling": 69,
            "fielding": 82,
            "power": 75
        }
    },
    {
        "player": "Axar Patel (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6430",
        "stats": {
            "batting": 92,
            "bowling": 93,
            "fielding": 78,
            "power": 75
        }
    },
    {
        "player": "Dinesh Karthik (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5421",
        "stats": {
            "batting": 76,
            "bowling": 32,
            "fielding": 90,
            "power": 99
        }
    },
    {
        "player": "Ishan Kishan (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9293",
        "stats": {
            "batting": 78,
            "bowling": 50,
            "fielding": 78,
            "power": 79
        }
    },
    {
        "player": "Rahul Tripathi (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7093",
        "stats": {
            "batting": 70,
            "bowling": 76,
            "fielding": 65,
            "power": 64
        }
    },
    {
        "player": "Umran Malik (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1432",
        "stats": {
            "batting": 62,
            "bowling": 85,
            "fielding": 72,
            "power": 68
        }
    },
    {
        "player": "Arshdeep Singh (Z)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3298",
        "stats": {
            "batting": 52,
            "bowling": 31,
            "fielding": 69,
            "power": 80
        }
    },
    {
        "player": "Washington Sundar (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3205",
        "stats": {
            "batting": 60,
            "bowling": 79,
            "fielding": 79,
            "power": 90
        }
    },
    {
        "player": "Deepak Chahar (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1781",
        "stats": {
            "batting": 95,
            "bowling": 84,
            "fielding": 84,
            "power": 67
        }
    },
    {
        "player": "Rohit Sharma (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=766",
        "stats": {
            "batting": 52,
            "bowling": 72,
            "fielding": 85,
            "power": 65
        }
    },
    {
        "player": "MS Dhoni (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8849",
        "stats": {
            "batting": 61,
            "bowling": 89,
            "fielding": 71,
            "power": 90
        }
    },
    {
        "player": "Hardik Pandya (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2325",
        "stats": {
            "batting": 73,
            "bowling": 36,
            "fielding": 66,
            "power": 85
        }
    },
    {
        "player": "KL Rahul (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4484",
        "stats": {
            "batting": 93,
            "bowling": 35,
            "fielding": 86,
            "power": 66
        }
    },
    {
        "player": "Ravindra Jadeja (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5420",
        "stats": {
            "batting": 53,
            "bowling": 87,
            "fielding": 72,
            "power": 79
        }
    },
    {
        "player": "Shubman Gill (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3871",
        "stats": {
            "batting": 92,
            "bowling": 39,
            "fielding": 85,
            "power": 84
        }
    },
    {
        "player": "Rishabh Pant (Z)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=381",
        "stats": {
            "batting": 57,
            "bowling": 78,
            "fielding": 96,
            "power": 65
        }
    },
    {
        "player": "Jasprit Bumrah (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9718",
        "stats": {
            "batting": 75,
            "bowling": 75,
            "fielding": 61,
            "power": 84
        }
    },
    {
        "player": "Babar Azam (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=55",
        "stats": {
            "batting": 60,
            "bowling": 43,
            "fielding": 66,
            "power": 88
        }
    },
    {
        "player": "Mohammad Rizwan (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7049",
        "stats": {
            "batting": 89,
            "bowling": 65,
            "fielding": 69,
            "power": 71
        }
    },
    {
        "player": "Shaheen Afridi (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1513",
        "stats": {
            "batting": 57,
            "bowling": 34,
            "fielding": 84,
            "power": 80
        }
    },
    {
        "player": "Ben Stokes (Z)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7235",
        "stats": {
            "batting": 85,
            "bowling": 54,
            "fielding": 86,
            "power": 81
        }
    },
    {
        "player": "Joe Root (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3327",
        "stats": {
            "batting": 75,
            "bowling": 81,
            "fielding": 93,
            "power": 97
        }
    },
    {
        "player": "Steve Smith (Z)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9531",
        "stats": {
            "batting": 100,
            "bowling": 88,
            "fielding": 79,
            "power": 91
        }
    },
    {
        "player": "Kane Williamson (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4892",
        "stats": {
            "batting": 61,
            "bowling": 33,
            "fielding": 61,
            "power": 91
        }
    },
    {
        "player": "Trent Boult (Z)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2052",
        "stats": {
            "batting": 77,
            "bowling": 66,
            "fielding": 100,
            "power": 71
        }
    },
    {
        "player": "Fakhar Zaman (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9619",
        "stats": {
            "batting": 64,
            "bowling": 39,
            "fielding": 93,
            "power": 63
        }
    },
    {
        "player": "Imam-ul-Haq (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8218",
        "stats": {
            "batting": 51,
            "bowling": 58,
            "fielding": 88,
            "power": 65
        }
    },
    {
        "player": "Tim Southee (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5142",
        "stats": {
            "batting": 63,
            "bowling": 91,
            "fielding": 93,
            "power": 66
        }
    },
    {
        "player": "Tom Latham (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6422",
        "stats": {
            "batting": 89,
            "bowling": 84,
            "fielding": 83,
            "power": 81
        }
    },
    {
        "player": "Josh Hazlewood (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8648",
        "stats": {
            "batting": 53,
            "bowling": 34,
            "fielding": 81,
            "power": 64
        }
    },
    {
        "player": "Mitchell Starc (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6935",
        "stats": {
            "batting": 73,
            "bowling": 57,
            "fielding": 84,
            "power": 92
        }
    },
    {
        "player": "Marcus Stoinis (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2249",
        "stats": {
            "batting": 91,
            "bowling": 98,
            "fielding": 80,
            "power": 95
        }
    },
    {
        "player": "Kuldeep Yadav (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4725",
        "stats": {
            "batting": 73,
            "bowling": 37,
            "fielding": 86,
            "power": 79
        }
    },
    {
        "player": "Axar Patel (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=351",
        "stats": {
            "batting": 93,
            "bowling": 60,
            "fielding": 95,
            "power": 86
        }
    },
    {
        "player": "Ishan Kishan (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2545",
        "stats": {
            "batting": 90,
            "bowling": 51,
            "fielding": 88,
            "power": 69
        }
    },
    {
        "player": "Rahul Tripathi (Z)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3020",
        "stats": {
            "batting": 74,
            "bowling": 66,
            "fielding": 63,
            "power": 96
        }
    },
    {
        "player": "Umran Malik (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7762",
        "stats": {
            "batting": 95,
            "bowling": 90,
            "fielding": 98,
            "power": 90
        }
    },
    {
        "player": "Arshdeep Singh (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2123",
        "stats": {
            "batting": 92,
            "bowling": 48,
            "fielding": 82,
            "power": 66
        }
    },
    {
        "player": "Virat Kohli (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9844",
        "stats": {
            "batting": 88,
            "bowling": 79,
            "fielding": 88,
            "power": 83
        }
    },
    {
        "player": "Rohit Sharma (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=923",
        "stats": {
            "batting": 55,
            "bowling": 78,
            "fielding": 78,
            "power": 91
        }
    },
    {
        "player": "MS Dhoni (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8983",
        "stats": {
            "batting": 95,
            "bowling": 33,
            "fielding": 98,
            "power": 67
        }
    },
    {
        "player": "Hardik Pandya (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6645",
        "stats": {
            "batting": 65,
            "bowling": 40,
            "fielding": 76,
            "power": 84
        }
    },
    {
        "player": "KL Rahul (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7829",
        "stats": {
            "batting": 65,
            "bowling": 89,
            "fielding": 73,
            "power": 84
        }
    },
    {
        "player": "Rishabh Pant (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1439",
        "stats": {
            "batting": 99,
            "bowling": 79,
            "fielding": 98,
            "power": 71
        }
    },
    {
        "player": "Jasprit Bumrah (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1805",
        "stats": {
            "batting": 75,
            "bowling": 32,
            "fielding": 66,
            "power": 88
        }
    },
    {
        "player": "Shreyas Iyer (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7758",
        "stats": {
            "batting": 94,
            "bowling": 57,
            "fielding": 74,
            "power": 96
        }
    },
    {
        "player": "Babar Azam (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=880",
        "stats": {
            "batting": 60,
            "bowling": 96,
            "fielding": 82,
            "power": 91
        }
    },
    {
        "player": "Mohammad Rizwan (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4002",
        "stats": {
            "batting": 61,
            "bowling": 32,
            "fielding": 88,
            "power": 72
        }
    },
    {
        "player": "Shaheen Afridi (Z)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5847",
        "stats": {
            "batting": 78,
            "bowling": 54,
            "fielding": 95,
            "power": 91
        }
    },
    {
        "player": "Joe Root (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2932",
        "stats": {
            "batting": 50,
            "bowling": 82,
            "fielding": 78,
            "power": 88
        }
    },
    {
        "player": "Steve Smith (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2876",
        "stats": {
            "batting": 64,
            "bowling": 33,
            "fielding": 89,
            "power": 73
        }
    },
    {
        "player": "Pat Cummins (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6213",
        "stats": {
            "batting": 75,
            "bowling": 75,
            "fielding": 71,
            "power": 72
        }
    },
    {
        "player": "Kane Williamson (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3771",
        "stats": {
            "batting": 53,
            "bowling": 99,
            "fielding": 68,
            "power": 68
        }
    },
    {
        "player": "Tim Southee (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2129",
        "stats": {
            "batting": 65,
            "bowling": 81,
            "fielding": 60,
            "power": 94
        }
    },
    {
        "player": "Josh Hazlewood (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7941",
        "stats": {
            "batting": 93,
            "bowling": 38,
            "fielding": 62,
            "power": 76
        }
    },
    {
        "player": "Mitchell Starc (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3290",
        "stats": {
            "batting": 51,
            "bowling": 75,
            "fielding": 81,
            "power": 97
        }
    },
    {
        "player": "Marcus Stoinis (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9893",
        "stats": {
            "batting": 91,
            "bowling": 98,
            "fielding": 85,
            "power": 99
        }
    },
    {
        "player": "Mohammed Shami (Z)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6506",
        "stats": {
            "batting": 90,
            "bowling": 94,
            "fielding": 99,
            "power": 88
        }
    },
    {
        "player": "Kuldeep Yadav (Z)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9773",
        "stats": {
            "batting": 60,
            "bowling": 100,
            "fielding": 100,
            "power": 82
        }
    },
    {
        "player": "Dinesh Karthik (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2527",
        "stats": {
            "batting": 79,
            "bowling": 96,
            "fielding": 74,
            "power": 91
        }
    },
    {
        "player": "Rahul Tripathi (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3789",
        "stats": {
            "batting": 62,
            "bowling": 100,
            "fielding": 83,
            "power": 61
        }
    },
    {
        "player": "Umran Malik (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2975",
        "stats": {
            "batting": 53,
            "bowling": 58,
            "fielding": 91,
            "power": 98
        }
    },
    {
        "player": "Arshdeep Singh (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3307",
        "stats": {
            "batting": 86,
            "bowling": 36,
            "fielding": 92,
            "power": 64
        }
    },
    {
        "player": "Washington Sundar (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2522",
        "stats": {
            "batting": 81,
            "bowling": 39,
            "fielding": 84,
            "power": 68
        }
    },
    {
        "player": "Deepak Chahar (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2199",
        "stats": {
            "batting": 69,
            "bowling": 83,
            "fielding": 84,
            "power": 67
        }
    },
    {
        "player": "Rohit Sharma (Z)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7628",
        "stats": {
            "batting": 63,
            "bowling": 67,
            "fielding": 88,
            "power": 93
        }
    },
    {
        "player": "MS Dhoni (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6372",
        "stats": {
            "batting": 92,
            "bowling": 61,
            "fielding": 73,
            "power": 96
        }
    },
    {
        "player": "Hardik Pandya (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7962",
        "stats": {
            "batting": 51,
            "bowling": 47,
            "fielding": 70,
            "power": 75
        }
    },
    {
        "player": "Ravindra Jadeja (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=753",
        "stats": {
            "batting": 100,
            "bowling": 57,
            "fielding": 76,
            "power": 73
        }
    },
    {
        "player": "Shubman Gill (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3023",
        "stats": {
            "batting": 64,
            "bowling": 76,
            "fielding": 89,
            "power": 66
        }
    },
    {
        "player": "Rishabh Pant (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9914",
        "stats": {
            "batting": 63,
            "bowling": 94,
            "fielding": 98,
            "power": 91
        }
    },
    {
        "player": "Jasprit Bumrah (Z)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1364",
        "stats": {
            "batting": 55,
            "bowling": 95,
            "fielding": 75,
            "power": 74
        }
    },
    {
        "player": "Shaheen Afridi (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4061",
        "stats": {
            "batting": 82,
            "bowling": 41,
            "fielding": 66,
            "power": 93
        }
    },
    {
        "player": "Ben Stokes (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4713",
        "stats": {
            "batting": 59,
            "bowling": 46,
            "fielding": 94,
            "power": 63
        }
    },
    {
        "player": "Joe Root (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6210",
        "stats": {
            "batting": 62,
            "bowling": 32,
            "fielding": 86,
            "power": 87
        }
    },
    {
        "player": "Trent Boult (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8843",
        "stats": {
            "batting": 84,
            "bowling": 58,
            "fielding": 96,
            "power": 76
        }
    },
    {
        "player": "Imam-ul-Haq (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8027",
        "stats": {
            "batting": 51,
            "bowling": 58,
            "fielding": 73,
            "power": 67
        }
    },
    {
        "player": "Tim Southee (Z)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8164",
        "stats": {
            "batting": 88,
            "bowling": 72,
            "fielding": 74,
            "power": 62
        }
    },
    {
        "player": "Tom Latham (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2116",
        "stats": {
            "batting": 52,
            "bowling": 80,
            "fielding": 88,
            "power": 70
        }
    },
    {
        "player": "Marnus Labuschagne (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5433",
        "stats": {
            "batting": 80,
            "bowling": 80,
            "fielding": 78,
            "power": 71
        }
    },
    {
        "player": "Mohammed Shami (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7429",
        "stats": {
            "batting": 96,
            "bowling": 92,
            "fielding": 92,
            "power": 78
        }
    },
    {
        "player": "Yuzvendra Chahal (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8465",
        "stats": {
            "batting": 70,
            "bowling": 38,
            "fielding": 69,
            "power": 76
        }
    },
    {
        "player": "Axar Patel (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=232",
        "stats": {
            "batting": 73,
            "bowling": 57,
            "fielding": 98,
            "power": 80
        }
    },
    {
        "player": "Ishan Kishan (Z)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7368",
        "stats": {
            "batting": 70,
            "bowling": 100,
            "fielding": 97,
            "power": 73
        }
    },
    {
        "player": "Arshdeep Singh (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9446",
        "stats": {
            "batting": 75,
            "bowling": 48,
            "fielding": 62,
            "power": 82
        }
    },
    {
        "player": "Washington Sundar (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9694",
        "stats": {
            "batting": 51,
            "bowling": 55,
            "fielding": 83,
            "power": 81
        }
    },
    {
        "player": "Deepak Chahar (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4140",
        "stats": {
            "batting": 89,
            "bowling": 55,
            "fielding": 83,
            "power": 92
        }
    },
    {
        "player": "Virat Kohli (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=99",
        "stats": {
            "batting": 71,
            "bowling": 69,
            "fielding": 76,
            "power": 74
        }
    },
    {
        "player": "Rohit Sharma (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1087",
        "stats": {
            "batting": 100,
            "bowling": 37,
            "fielding": 60,
            "power": 93
        }
    },
    {
        "player": "MS Dhoni (Z)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=407",
        "stats": {
            "batting": 64,
            "bowling": 49,
            "fielding": 99,
            "power": 83
        }
    },
    {
        "player": "Hardik Pandya (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=630",
        "stats": {
            "batting": 58,
            "bowling": 73,
            "fielding": 83,
            "power": 72
        }
    },
    {
        "player": "KL Rahul (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3271",
        "stats": {
            "batting": 51,
            "bowling": 91,
            "fielding": 84,
            "power": 76
        }
    },
    {
        "player": "Babar Azam (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6729",
        "stats": {
            "batting": 54,
            "bowling": 76,
            "fielding": 74,
            "power": 82
        }
    },
    {
        "player": "David Warner (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3954",
        "stats": {
            "batting": 93,
            "bowling": 43,
            "fielding": 83,
            "power": 87
        }
    },
    {
        "player": "Steve Smith (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5134",
        "stats": {
            "batting": 70,
            "bowling": 61,
            "fielding": 90,
            "power": 82
        }
    },
    {
        "player": "Pat Cummins (Z)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8620",
        "stats": {
            "batting": 95,
            "bowling": 82,
            "fielding": 82,
            "power": 79
        }
    },
    {
        "player": "Trent Boult (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3725",
        "stats": {
            "batting": 69,
            "bowling": 87,
            "fielding": 67,
            "power": 77
        }
    },
    {
        "player": "Tim Southee (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1401",
        "stats": {
            "batting": 51,
            "bowling": 35,
            "fielding": 65,
            "power": 60
        }
    },
    {
        "player": "Josh Hazlewood (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=472",
        "stats": {
            "batting": 57,
            "bowling": 65,
            "fielding": 92,
            "power": 96
        }
    },
    {
        "player": "Mitchell Starc (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6497",
        "stats": {
            "batting": 84,
            "bowling": 98,
            "fielding": 65,
            "power": 86
        }
    },
    {
        "player": "Marnus Labuschagne (Z)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2954",
        "stats": {
            "batting": 90,
            "bowling": 70,
            "fielding": 91,
            "power": 91
        }
    },
    {
        "player": "Mohammed Shami (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7935",
        "stats": {
            "batting": 100,
            "bowling": 85,
            "fielding": 96,
            "power": 91
        }
    },
    {
        "player": "Kuldeep Yadav (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4471",
        "stats": {
            "batting": 59,
            "bowling": 92,
            "fielding": 73,
            "power": 66
        }
    },
    {
        "player": "Dinesh Karthik (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2414",
        "stats": {
            "batting": 97,
            "bowling": 71,
            "fielding": 77,
            "power": 93
        }
    },
    {
        "player": "Rahul Tripathi (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9182",
        "stats": {
            "batting": 94,
            "bowling": 73,
            "fielding": 94,
            "power": 84
        }
    },
    {
        "player": "Umran Malik (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2129",
        "stats": {
            "batting": 84,
            "bowling": 85,
            "fielding": 94,
            "power": 78
        }
    },
    {
        "player": "Arshdeep Singh (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8749",
        "stats": {
            "batting": 65,
            "bowling": 65,
            "fielding": 77,
            "power": 78
        }
    },
    {
        "player": "Washington Sundar (Z)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6327",
        "stats": {
            "batting": 79,
            "bowling": 75,
            "fielding": 63,
            "power": 100
        }
    },
    {
        "player": "Deepak Chahar (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3279",
        "stats": {
            "batting": 69,
            "bowling": 91,
            "fielding": 83,
            "power": 64
        }
    },
    {
        "player": "Virat Kohli (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=559",
        "stats": {
            "batting": 50,
            "bowling": 85,
            "fielding": 93,
            "power": 98
        }
    },
    {
        "player": "Shubman Gill (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4465",
        "stats": {
            "batting": 57,
            "bowling": 48,
            "fielding": 73,
            "power": 67
        }
    },
    {
        "player": "Rishabh Pant (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1079",
        "stats": {
            "batting": 50,
            "bowling": 71,
            "fielding": 98,
            "power": 73
        }
    },
    {
        "player": "Shreyas Iyer (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2425",
        "stats": {
            "batting": 100,
            "bowling": 83,
            "fielding": 85,
            "power": 62
        }
    },
    {
        "player": "Shaheen Afridi (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=43",
        "stats": {
            "batting": 74,
            "bowling": 47,
            "fielding": 89,
            "power": 67
        }
    },
    {
        "player": "Joe Root (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=7311",
        "stats": {
            "batting": 54,
            "bowling": 78,
            "fielding": 67,
            "power": 67
        }
    },
    {
        "player": "Fakhar Zaman (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=946",
        "stats": {
            "batting": 57,
            "bowling": 99,
            "fielding": 78,
            "power": 84
        }
    },
    {
        "player": "Tim Southee (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8705",
        "stats": {
            "batting": 99,
            "bowling": 67,
            "fielding": 86,
            "power": 98
        }
    },
    {
        "player": "Marcus Stoinis (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6",
        "stats": {
            "batting": 60,
            "bowling": 56,
            "fielding": 68,
            "power": 77
        }
    },
    {
        "player": "Yuzvendra Chahal (Z)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=2361",
        "stats": {
            "batting": 50,
            "bowling": 92,
            "fielding": 77,
            "power": 86
        }
    },
    {
        "player": "Dinesh Karthik (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=1611",
        "stats": {
            "batting": 74,
            "bowling": 96,
            "fielding": 91,
            "power": 73
        }
    },
    {
        "player": "Rahul Tripathi (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4961",
        "stats": {
            "batting": 95,
            "bowling": 66,
            "fielding": 70,
            "power": 93
        }
    },
    {
        "player": "Virat Kohli (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=3891",
        "stats": {
            "batting": 99,
            "bowling": 55,
            "fielding": 89,
            "power": 96
        }
    },
    {
        "player": "Hardik Pandya (Z)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4584",
        "stats": {
            "batting": 85,
            "bowling": 90,
            "fielding": 77,
            "power": 60
        }
    },
    {
        "player": "Ravindra Jadeja (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4788",
        "stats": {
            "batting": 83,
            "bowling": 97,
            "fielding": 89,
            "power": 64
        }
    },
    {
        "player": "Shubman Gill (B)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=5553",
        "stats": {
            "batting": 65,
            "bowling": 78,
            "fielding": 78,
            "power": 71
        }
    },
    {
        "player": "Rishabh Pant (X)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9747",
        "stats": {
            "batting": 59,
            "bowling": 74,
            "fielding": 84,
            "power": 69
        }
    },
    {
        "player": "Shreyas Iyer (C)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=9970",
        "stats": {
            "batting": 82,
            "bowling": 81,
            "fielding": 68,
            "power": 87
        }
    },
    {
        "player": "David Warner (Z)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=867",
        "stats": {
            "batting": 80,
            "bowling": 82,
            "fielding": 67,
            "power": 90
        }
    },
    {
        "player": "Fakhar Zaman (Y)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=8991",
        "stats": {
            "batting": 86,
            "bowling": 72,
            "fielding": 80,
            "power": 83
        }
    },
    {
        "player": "Imam-ul-Haq (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=4161",
        "stats": {
            "batting": 93,
            "bowling": 68,
            "fielding": 67,
            "power": 91
        }
    },
    {
        "player": "Tom Latham (A)",
        "image": "https://source.unsplash.com/250x250/?cricket,player&sig=6757",
        "stats": {
            "batting": 64,
            "bowling": 30,
            "fielding": 91,
            "power": 78
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
    document.getElementById("p1count").textContent = p1Deck.length;
    document.getElementById("p2count").textContent = p2Deck.length;
    document.getElementById("score").textContent = `Player 1: ${p1Score} | Player 2: ${p2Score}`;
}

function startGame() {
    // console.log(cards);
    shuffle(cards);
    // console.log(cards);
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

    // if (p1Deck.length === 0 || p2Deck.length === 0) {
    //     const result = p1Score > p2Score ? "Player 1 Wins!" : p2Score > p1Score ? "Player 2 Wins!" : "It's a Draw!";
    //     setTimeout(() => alert("Game Over!\n" + result), 500);
    //     return;
    // }
    if (p1Deck.length === 0 || p2Deck.length === 0) {
        const result = p1Score > p2Score ? "Player 1 Wins!" : p2Score > p1Score ? "Player 2 Wins!" : "It's a Draw!";
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
    card1.innerHTML = "";
    card2.innerHTML = "";

    const p1Card = createCard(p1, true);
    const p2Card = createCard(p2, false);
    card1.appendChild(p1Card);
    card2.appendChild(p2Card);

    const buttons = document.getElementById("buttons");
    buttons.innerHTML = "";

    const stats = Object.keys(p1.stats);

    if (currentPlayer === 1) {
        // Player 1 turn – show buttons for stat selection
        stats.forEach(stat => {
            const btn = document.createElement("button");
            btn.textContent = stat;
            btn.onclick = () => compareStat(stat);
            buttons.appendChild(btn);
        });
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
    buttons.innerHTML = `<strong>${stat.toUpperCase()} chosen!</strong>`;

    // Clear previous highlights
    document.querySelectorAll('.card').forEach(c => c.classList.remove('winner'));

    if (currentPlayer === 1) {
        // Player 1 turn: flip Player 2 card
        card2.style.transform = "rotateY(180deg)";

        setTimeout(() => {
            // Flip Player 1's card after delay
            card1.style.transform = "rotateY(180deg)";

            setTimeout(() => {
                handleComparison(stat, p1, p2);
            }, 1000); // Wait after flipping Player 1's card
        }, 700); // Delay before flipping Player 1's card

    } else {
        // Player 2 (AI) turn: flip Player 2 card first
        card2.style.transform = "rotateY(180deg)";

        setTimeout(() => {
            // Flip Player 1's card after delay
            card1.style.transform = "rotateY(180deg)";

            setTimeout(() => {
                handleComparison(stat, p1, p2);
            }, 1000); // Wait after both cards are flipped
        }, 700); // Delay between card flips
    }
}
function handleComparison(stat, p1, p2) {
    if (p1.stats[stat] > p2.stats[stat]) {
        document.getElementById("card1").classList.add("winner");
        p1Score++;
        p1Deck.push(p1, p2);
        currentPlayer = 1;
    } else if (p2.stats[stat] > p1.stats[stat]) {
        document.getElementById("card2").classList.add("winner");
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
    <div class="player-img" style="background-image: url('${card.image}')"></div>
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
console.log("Card rendering:", cards);

startGame();