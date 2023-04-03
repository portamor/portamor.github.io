import React from "react";

//----Components
import ReviewCard from "../ReviewCard/ReviewCard";
import UserCard   from "../UserCard/UserCard";
import CourseAccordion from "../CourseAccordion/CourseAccordion";

//----Actions, Utils, Constants
import * as constants from "../../constants";
import * as actions   from "../../Redux/actions";
//styles
import styles from "./SelectedData.module.css";

const SelectedData = (props) => {
  const {
    courseDetail,
    courseId,
    courseReviews,
    courseUsers,
    courseSections,
    dispatch,
    selectedButtonContent, 
  } = props;

   switch (selectedButtonContent) {
    case constants.VER_TEMARIO:
      if(!courseSections.length) dispatch(actions.getSectionsByCourseId(courseId)) 

      return <CourseAccordion sections={courseSections}/>
    
    case constants.SOBRE_EL_INSTRUCTOR:
      return <div>Instructor</div>;

    case constants.COMENTARIOS:
      if(!courseReviews.length) dispatch(actions.getReviewsByCourseId(courseId));

      const reviews = courseReviews && courseReviews.map((review) => 
        <ReviewCard 
        key         = {review.id}
        id          = {review.id}
        title       = {review.title}
        comment     = {review.comment}
        stars_value = {review.stars_value} />
      );

      return reviews;
    
    case constants.MATERIALES:
      if(!courseDetail) dispatch(actions.getCourseDetail(courseId));

      const materials = courseDetail.materials.map((material) => 
        <h2 className={styles["info-component-material-title"]}>
          {material} <br />
        </h2>
      )
      return <div>
        <h2 className={styles["info-component-material-title"]}> 
          Para este curso necesitaras los siguientes materiales: <br /> 
        </h2>
        {materials}
      </div>;

    case constants.PARTICIPANTES:
      if(!courseUsers.length) dispatch(actions.getUsersByCourseId(courseId));

      const partipants = courseUsers && courseUsers.map((user) => 
        <UserCard 
        key       = {user.id}
        id        = {user.id}
        lastName  = {user.lastName}
        name      = {user.name} />
      );
      return partipants;

    case constants.PREGUNTAS_FRECUENTES:
      return <div>Preguntas frecuentes</div>;

    default:
      return null;
  }
};

export default SelectedData;