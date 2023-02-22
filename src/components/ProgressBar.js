import '../styles/ProgressBar.css';

const ProgressBar = ({ progres }) => {
    return (
      <div className="progress-bar">
        <div className='outer-bar'>
          <div className='inner-bar' style={{width:`${progres}%`}}></div>  
        </div>
        
      </div>
    );
  }
  
  export default ProgressBar;