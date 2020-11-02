const checkRegex = (id, value) => {
    let regex = null;
    let errors = null;
    
    if (id === 'mail') {
        regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        if (!regex.test(value))
            errors = '* Adresse Mail incorect';
    }
    if (id === 'password') {
        regex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}/;
        if (!regex.test(value))
            errors = '* Au moins une minuscule, une majuscule et un chiffre';
    }
    if (id === 'phone') {
        regex = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,8})$/;
        if (!regex.test(value))
            errors = "* Format: +33610122334";
    }
    if (id === 'codeVerification') {
        regex = /^\d{6,6}$/;
        if (!regex.test(value))
            errors = "* Code incorrect ex: 123456";
    }
    return errors;
}

export const checkInput = (id, value,min, max) => {
    let error = null;
    
    if (value.length < min)
        error = `* ${min} charactères min.`;
    else if (value.length > max)
        error = `* ${max} charactères max.`;
    else
        error = checkRegex(id, value);
    return error;
} 