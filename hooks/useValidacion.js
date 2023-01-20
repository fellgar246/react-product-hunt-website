import React, { useEffect, useState } from 'react'


const useValidacion = (stateInicial, validar, fn) => {

    const [ valores, guardarValores ] = useState(stateInicial);
    const [ errores, guardarErrores ] = useState({});
    const [ submitForm, guardarSubmitForm ] = useState(false);

    useEffect(() => {
        if(submitForm) {
            const noErrores = Object.keys(errores).length === 0;
            
            if(noErrores) {
                fn();
            }

            guardarSubmitForm(false);
        }
    }, [errores]);

    // Función que se ejecuta confirme el usuario escribe algi
    const handleChange = e => {
        guardarValores({
            ...valores,
            [e.target.name] : e.target.value
        })
    }

    // Función que se ejecuta cuando el usuario hace submit
    const handleSubmit = e => {
        e.preventDefault();
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
        guardarSubmitForm(true);
    }

    // Cuando se realiza el evento blur
    const handleBlur = () => {
        const erroresValidacion = validar(valores);
        guardarErrores(erroresValidacion);
    }

  return {
    valores,
    errores,
    handleSubmit,
    handleChange,
    handleBlur
  }
}

export default useValidacion;