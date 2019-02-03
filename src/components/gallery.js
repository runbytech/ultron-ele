/**
 * @2019/01/31
 */
import React from 'react'
import { Link } from 'gatsby'
import styles from '../style/gallery.module.css'

const CategoryCard = ({imgPath, url, isMain, title}) => (
  <Link to={url} className={styles.darkenLink}>
    <img className={styles.imgInColumn} src={imgPath} />
    <h4 className={isMain?styles.mainCategoryTitle:styles.subCategoryTitle}>{title}</h4>
  </Link>
)

const Gallery = () => (
  <div className={styles.gallery}>
    {/** 1st column */}
    <div className={styles.cateColumn}>
      <CategoryCard url="/" isMain={true} imgPath="/img/data_science.jpeg"
        title="Data Science"/>
    </div>
    {/** 2st column */}
    <div className={styles.cateColumn}>
      <div className={styles.cateColumnRowTop}>
        <CategoryCard url="/" isMain={false} imgPath="/img/business.jpeg" 
          title="Business"/>
      </div>
      <div className={styles.cateColumnRow}>
        <CategoryCard url="/" isMain={false} imgPath="/img/computer_science.jpeg" 
          title="Computer Science"/>
      </div>
    </div>
    {/** 3rd column*/}
    <div className={styles.cateColumn}>
      <div className={styles.cateColumnRowTop}>
        <CategoryCard url="/" isMain={false} imgPath="/img/personal_development.jpeg" 
          title="Personal Development"/>
      </div>
      <div className={styles.cateColumnRow}>
        <CategoryCard url="/" isMain={false} imgPath="/img/information_technology.jpeg" 
          title="Information Technology"/>
      </div>
    </div>
  </div>
)

export default Gallery