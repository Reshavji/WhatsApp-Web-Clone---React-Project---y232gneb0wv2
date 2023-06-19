const Contactbox = ({ groups }) => {
  return (
    <div className="contact-box">
      <ul>
        {groups.map((group, index) => (
            <div className="contact-list">
                <img className="avatar" src="https://static-prod.adweek.com/wp-content/uploads/2023/01/WhatsApp-Avatar-Profile-Photo-Hero-652x367.png" alt="user" />
          <h2 key={index}>{group}</h2>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Contactbox;
