/**
 * @2019/01/31
 */
import React from 'react'
import { Link } from 'gatsby'
import styles from '../style/gallery.module.css'

const CategoryCard = ({imgPath, url, isMain, title, type}) => (
  <Link to={url} className={styles.darkenLink} state={{ imgPath, title, type, }}>
    <img className={styles.imgInColumn} src={imgPath} />
    <h4 className={isMain?styles.mainCategoryTitle:styles.subCategoryTitle}>{title}</h4>
  </Link>
)

const Gallery = () => (
  <div className={styles.gallery}>
    {/** 1st column */}
    <div className={styles.cateColumn}>
      <CategoryCard url="/category/" isMain={true} imgPath="/img/data_science.jpeg"
        title="Data Science" type="ds"/>
    </div>
    {/** 2st column */}
    <div className={styles.cateColumn}>
      <div className={styles.cateColumnRowTop}>
        <CategoryCard url="/category/" isMain={false} imgPath="/img/business.jpeg" 
          title="Business" type="ds"/>
      </div>
      <div className={styles.cateColumnRow}>
        <CategoryCard url="/category/" isMain={false} imgPath="/img/computer_science.jpeg" 
          title="Computer Science" type="ds"/>
      </div>
    </div>
    {/** 3rd column*/}
    <div className={styles.cateColumn}>
      <div className={styles.cateColumnRowTop}>
        <CategoryCard url="/category/" isMain={false} imgPath="/img/personal_development.jpeg" 
          title="Personal Development" type="ds"/>
      </div>
      <div className={styles.cateColumnRow}>
        <CategoryCard url="/category/" isMain={false} imgPath="/img/information_technology.jpeg" 
          title="Information Technology" type="ds"/>
      </div>
    </div>
  </div>
)

export default Gallery