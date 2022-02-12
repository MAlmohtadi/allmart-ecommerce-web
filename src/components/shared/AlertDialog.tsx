import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

const AlertDialog = (props) => {
    const submit = () => {
        confirmAlert({
            title: 'Confirm to submit',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => alert('Click Yes'),
                },
                {
                    label: 'No',
                    onClick: () => alert('Click No'),
                },
            ],
        });
    };

    return (
        <div className="container">
            <button type="button" onClick={submit}>Confirm dialog</button>
        </div>
    );
};

export default AlertDialog;
