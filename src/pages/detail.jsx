import React from "react";

import CourseDetail from "../components/molecules/courseDetail";

const courses = [
    { 
      id: 1,
      image: "/assets/courseimage/english_junior.png",
      category: "English",
      title: "Basic English for Junior",
      price: "IDR 400.000",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      relatedCourses: [
        {
          image: "/assets/courseimage/english_expert.png",
          category: "English",
          title: "Complit Package - Expert English, TOEFL and IELTS",
          price: "IDR 2.000.000",
        },
        {
          image: "/assets/courseimage/mandarin.png",
          category: "Mandarin",
          title: "Level 1 Mandarin",
          price: "IDR 200.000",
        },
      ]
    },
    {   
        id: 2,
        image: "/assets/courseimage/indonesia.png",
        category: "Indonesian",
        title: "Kursus Bahasa Indonesia",
        price: "IDR 650.000",
        description: "This course will help you understand and speak Indonesian fluently.",
        relatedCourses: [
          {
            image: "/assets/courseimage/arabic.png",
            category: "Arabic",
            title: "Arabic Course - Beginner to Middle",
            price: "IDR 550.000",
            link: "",
          },
          { 
            id: 3,
            image: "/assets/courseimage/germany.png",
            category: "Deutsch",
            title: "Germany Language for Junior",
            price: "IDR 450.000",
            link: "",
          },
        ]
      },
  ];
  
const Detail = () => {
    return (
        <CourseDetail course={courses[0]} />
    )
}

export default Detail;