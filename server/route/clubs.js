const mongoose = require('mongoose');
const express = require('express');
const route = express.Router();
const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



// Clubs page
route.get('/', async (req, res) => {
    let user = {
        sport: "football"
    };

    //Dummy Club Object Structure
    const clubs = [
        // Cricket Clubs
        {
            id: 1,
            name: "Mumbai Warriors Cricket Club",
            sport: "cricket",
            slogan: "Premier cricket club with professional coaching and state-of-the-art facilities. Join our championship team!",
            logo: "/images/mumbai-warriors-logo.jpg",
            location: "Mumbai, Maharashtra",
            established: 2015,
            contact: {
                phone: "+91 9876543210",
                email: "info@mumbaiwarriors.com",
                website: "https://mumbaiwarriors.com"
            },
            address: {
                street: "Sports Complex, Andheri West",
                city: "Mumbai",
                state: "Maharashtra",
                pincode: "400058"
            },
            stats: {
                totalPlayers: 245,
                totalMatches: 156,
                matchesWon: 128,
                matchesLost: 28,
                winPercentage: 82.1
            },
            facilities: [
                "Professional cricket ground",
                "Indoor nets",
                "Gym facility",
                "Coaching staff",
                "Equipment rental"
            ],
            ageGroups: ["Under-16", "Under-19", "Senior", "Veterans"],
            fees: {
                registration: 2000,
                monthly: 1500,
                annual: 15000
            },
            coachingStaff: [
                {
                    name: "Rahul Sharma",
                    role: "Head Coach",
                    experience: "15 years",
                    specialization: "Batting"
                },
                {
                    name: "Priya Patel",
                    role: "Assistant Coach",
                    experience: "8 years",
                    specialization: "Bowling"
                }
            ],
            timings: {
                weekdays: "6:00 AM - 9:00 PM",
                weekends: "5:00 AM - 10:00 PM"
            },
            achievements: [
                "District Champions 2023",
                "State League Runners-up 2022",
                "Best Club Award 2021"
            ],
            socialMedia: {
                facebook: "https://facebook.com/mumbaiwarriors",
                instagram: "https://instagram.com/mumbaiwarriors",
                twitter: "https://twitter.com/mumbaiwarriors"
            },
            isActive: true,
            joinable: true,
            featured: true
        },

        {
            id: 2,
            name: "Delhi Capitals Academy",
            sport: "cricket",
            slogan: "Grassroots cricket development with focus on youth training and competitive tournaments.",
            logo: "/images/delhi-capitals-logo.jpg",
            location: "Delhi, India",
            established: 2018,
            contact: {
                phone: "+91 9876543211",
                email: "academy@delhicapitals.com",
                website: "https://delhicapitalsacademy.com"
            },
            address: {
                street: "Sector 12, Dwarka",
                city: "Delhi",
                state: "Delhi",
                pincode: "110075"
            },
            stats: {
                totalPlayers: 156,
                totalMatches: 89,
                matchesWon: 67,
                matchesLost: 22,
                winPercentage: 75.3
            },
            facilities: [
                "Youth training ground",
                "Batting cages",
                "Fitness center",
                "Video analysis room"
            ],
            ageGroups: ["Under-12", "Under-14", "Under-16", "Under-19"],
            fees: {
                registration: 1500,
                monthly: 1200,
                annual: 12000
            },
            coachingStaff: [
                {
                    name: "Amit Kumar",
                    role: "Head Coach",
                    experience: "12 years",
                    specialization: "Youth Development"
                }
            ],
            timings: {
                weekdays: "4:00 PM - 8:00 PM",
                weekends: "8:00 AM - 6:00 PM"
            },
            achievements: [
                "Youth Championship 2023",
                "Best Academy Award 2022"
            ],
            socialMedia: {
                facebook: "https://facebook.com/delhicapitalsacademy",
                instagram: "https://instagram.com/delhicapitalsacademy"
            },
            isActive: true,
            joinable: true,
            featured: false
        },

        // Football Clubs
        {
            id: 3,
            name: "Bangalore FC United",
            sport: "football",
            slogan: "Dynamic football club with weekly matches and professional training sessions for all skill levels.",
            logo: "/images/bangalore-fc-logo.jpg",
            location: "Bangalore, Karnataka",
            established: 2012,
            contact: {
                phone: "+91 9876543212",
                email: "contact@bangalorefc.com",
                website: "https://bangalorefc.com"
            },
            address: {
                street: "Football Stadium, Koramangala",
                city: "Bangalore",
                state: "Karnataka",
                pincode: "560034"
            },
            stats: {
                totalPlayers: 189,
                totalMatches: 134,
                matchesWon: 98,
                matchesLost: 36,
                winPercentage: 73.1
            },
            facilities: [
                "Full-size football pitch",
                "Training ground",
                "Gym facility",
                "Medical room",
                "Changing rooms"
            ],
            ageGroups: ["Under-15", "Under-18", "Senior", "Veterans"],
            fees: {
                registration: 3000,
                monthly: 2000,
                annual: 20000
            },
            coachingStaff: [
                {
                    name: "Carlos Rodriguez",
                    role: "Head Coach",
                    experience: "18 years",
                    specialization: "Tactical Training"
                },
                {
                    name: "Suresh Nair",
                    role: "Fitness Coach",
                    experience: "10 years",
                    specialization: "Physical Conditioning"
                }
            ],
            timings: {
                weekdays: "5:30 AM - 8:00 AM, 6:00 PM - 9:00 PM",
                weekends: "6:00 AM - 10:00 PM"
            },
            achievements: [
                "State League Champions 2023",
                "Regional Cup Winners 2022",
                "Fair Play Award 2021"
            ],
            socialMedia: {
                facebook: "https://facebook.com/bangalorefc",
                instagram: "https://instagram.com/bangalorefc",
                twitter: "https://twitter.com/bangalorefc"
            },
            isActive: true,
            joinable: true,
            featured: true
        },

        {
            id: 4,
            name: "Chennai City Strikers",
            sport: "football",
            slogan: "Competitive football club focusing on league participation and skill development programs.",
            logo: "/images/chennai-strikers-logo.jpg",
            location: "Chennai, Tamil Nadu",
            established: 2016,
            contact: {
                phone: "+91 9876543213",
                email: "info@chennaicitystrikers.com",
                website: "https://chennaicitystrikers.com"
            },
            address: {
                street: "Sports Complex, Velachery",
                city: "Chennai",
                state: "Tamil Nadu",
                pincode: "600042"
            },
            stats: {
                totalPlayers: 134,
                totalMatches: 76,
                matchesWon: 54,
                matchesLost: 22,
                winPercentage: 71.1
            },
            facilities: [
                "Training pitch",
                "Fitness center",
                "Tactical room",
                "Player lounge"
            ],
            ageGroups: ["Under-17", "Under-20", "Senior"],
            fees: {
                registration: 2500,
                monthly: 1800,
                annual: 18000
            },
            coachingStaff: [
                {
                    name: "Ravi Krishnan",
                    role: "Head Coach",
                    experience: "14 years",
                    specialization: "Attack Strategy"
                }
            ],
            timings: {
                weekdays: "6:00 AM - 8:00 AM, 7:00 PM - 9:00 PM",
                weekends: "7:00 AM - 11:00 AM, 4:00 PM - 8:00 PM"
            },
            achievements: [
                "City League Champions 2022",
                "Best Team Spirit Award 2021"
            ],
            socialMedia: {
                facebook: "https://facebook.com/chennaicitystrikers",
                instagram: "https://instagram.com/chennaicitystrikers"
            },
            isActive: true,
            joinable: true,
            featured: false
        },

        // Basketball Clubs
        {
            id: 5,
            name: "Kolkata Hoops Society",
            sport: "basketball",
            slogan: "Premier basketball club with indoor courts and professional coaching staff. Weekly tournaments included.",
            logo: "/images/kolkata-hoops-logo.jpg",
            location: "Kolkata, West Bengal",
            established: 2014,
            contact: {
                phone: "+91 9876543214",
                email: "contact@kolkatahoops.com",
                website: "https://kolkatahoops.com"
            },
            address: {
                street: "Sports Arena, Salt Lake",
                city: "Kolkata",
                state: "West Bengal",
                pincode: "700064"
            },
            stats: {
                totalPlayers: 98,
                totalMatches: 67,
                matchesWon: 45,
                matchesLost: 22,
                winPercentage: 67.2
            },
            facilities: [
                "Indoor basketball courts",
                "Strength training gym",
                "Recovery room",
                "Video analysis suite"
            ],
            ageGroups: ["Under-16", "Under-19", "Senior", "Women's Team"],
            fees: {
                registration: 2200,
                monthly: 1600,
                annual: 16000
            },
            coachingStaff: [
                {
                    name: "Michael Johnson",
                    role: "Head Coach",
                    experience: "16 years",
                    specialization: "Offensive Systems"
                },
                {
                    name: "Priya Ghosh",
                    role: "Assistant Coach",
                    experience: "9 years",
                    specialization: "Women's Basketball"
                }
            ],
            timings: {
                weekdays: "6:00 AM - 9:00 AM, 6:00 PM - 10:00 PM",
                weekends: "8:00 AM - 8:00 PM"
            },
            achievements: [
                "State Basketball Championship 2023",
                "Eastern Zone Winners 2022",
                "Best Club Infrastructure 2021"
            ],
            socialMedia: {
                facebook: "https://facebook.com/kolkatahoops",
                instagram: "https://instagram.com/kolkatahoops",
                twitter: "https://twitter.com/kolkatahoops"
            },
            isActive: true,
            joinable: true,
            featured: true
        },

        {
            id: 6,
            name: "Hyderabad Ballers",
            sport: "basketball",
            slogan: "Community basketball club welcoming players of all ages and skill levels. Fun and fitness focused!",
            logo: "/images/hyderabad-ballers-logo.jpg",
            location: "Hyderabad, Telangana",
            established: 2019,
            contact: {
                phone: "+91 9876543215",
                email: "info@hyderabadballers.com",
                website: "https://hyderabadballers.com"
            },
            address: {
                street: "Community Center, Banjara Hills",
                city: "Hyderabad",
                state: "Telangana",
                pincode: "500034"
            },
            stats: {
                totalPlayers: 76,
                totalMatches: 43,
                matchesWon: 28,
                matchesLost: 15,
                winPercentage: 65.1
            },
            facilities: [
                "Outdoor basketball court",
                "Basic gym equipment",
                "Community hall",
                "Refreshment area"
            ],
            ageGroups: ["All Ages", "Youth", "Adult", "Senior"],
            fees: {
                registration: 1000,
                monthly: 800,
                annual: 8000
            },
            coachingStaff: [
                {
                    name: "Raj Patel",
                    role: "Head Coach",
                    experience: "7 years",
                    specialization: "Community Development"
                }
            ],
            timings: {
                weekdays: "6:00 PM - 9:00 PM",
                weekends: "9:00 AM - 12:00 PM, 5:00 PM - 8:00 PM"
            },
            achievements: [
                "Community League Winners 2023",
                "Best Community Club 2022"
            ],
            socialMedia: {
                facebook: "https://facebook.com/hyderabadballers",
                instagram: "https://instagram.com/hyderabadballers"
            },
            isActive: true,
            joinable: true,
            featured: false
        }
    ];

    res.render("club_enlistpage", { user,clubs });
})







module.exports = route;