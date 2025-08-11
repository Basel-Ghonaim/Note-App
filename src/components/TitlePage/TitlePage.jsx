import style from './TitlePage.module.css'
let TitlePage = ({title}) => {
  return (
    <div className={style.headerPageContainer}>
      <h1 className={style.title}>{title}</h1>
    </div>
  );
}

export default TitlePage;