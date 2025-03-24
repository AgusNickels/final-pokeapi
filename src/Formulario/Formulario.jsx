import './../Formulario/Formulario.css';
import { useForm } from 'react-hook-form';
import { ValidateAge, ValidatePassword } from './Validator';

export function Formulario() {
  const { register, formState: { errors }, handleSubmit, watch } = useForm();

  let onSubmit = (data) => {
    console.log(data);
  };

  let guardarTel = watch("guardar-tel");

  return (
    <form className="formulario" onSubmit={handleSubmit(onSubmit)}>
      <h2>Sumate a la Legión Pokémon</h2>
      <div className="input-sector">
        <label>Nombre Completo</label>
        <input
          type="text"
          className="input"
          autoFocus
          {...register("nombre", {
            required: {
              value: true,
              message: "El nombre es obligatorio",
            },
            minLength: {
              value: 2,
              message: "El nombre no puede ser menor a 2 caracteres",
            },
          })}
        />
        {errors.nombre && <p className="error">{errors.nombre?.message}</p>}
      </div>

      <div className="input-sector">
        <label>Edad</label>
        <input
          type="number"
          className="input"
          {...register("edad", {
            required: true,
            validate: ValidateAge,
          })}
        />
        {errors.edad?.type === "required" && <p className="error">La edad es obligatoria</p>}
        {errors.edad?.type === "validate" && <p className="error">La edad tiene que ser entre 16 y 99 años</p>}
      </div>

      <div className="input-sector">
        <label>Correo Electrónico</label>
        <input
          type="email"
          className="input"
          {...register("email", {
            required: {
              value: true,
              message: "El correo electrónico es requerido",
            },
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,3}$/,
              message: "El correo electrónico no es válido",
            },
          })}
        />
        {errors.email && <p className="error">{errors.email?.message}</p>}
      </div>

      <div className="input-sector">
        <label>Contraseña</label>
        <input
          type="password"
          className="input"
          {...register("password", {
            required: {
              value: true,
              message: "La contraseña es obligatoria",
            },
            minLength: {
              value: 8,
              message: "La contraseña debe tener al menos 8 caracteres",
            },
            maxLength: {
              value: 20,
              message: "La contraseña debe tener como máximo 20 caracteres",
            },
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[+\-*/%])[a-zA-Z\d+\-*/%]{4,}$/,
              message: "La contraseña debe tener 1 símbolo, 1 número, 1 mayúscula y 1 minúscula",
            },
          })}
        />
        {errors.password && <p className="error">{errors.password?.message}</p>}
      </div>

      <div className="input-sector">
        <label>Repetir Contraseña</label>
        <input
          type="password"
          className="input"
          {...register("repeatPassword", {
            required: true,
            validate: (value) => ValidatePassword(value, watch("password")),
          })}
        />
        {errors.repeatPassword?.type === "required" && <p className="error">La contraseña es obligatoria</p>}
        {errors.repeatPassword?.type === "validate" && <p className="error">Las contraseñas no coinciden</p>}
      </div>

      <div className="input-sector">
        <label>¿Quieres recibir notificaciones a tu celular?</label>
        <input
          id="check"
          type="checkbox"
          className="input"
          {...register("guardar-tel")}
        />
      </div>

      {guardarTel && (
        <div className="input-sector">
          <label>Teléfono</label>
          <input
            type="text"
            className="input"
            {...register("tel", {
              required: {
                value: true,
                message: "El teléfono es obligatorio",
              },
              pattern: {
                value: /^[0-9+()]{10,}$/,
                message: "El teléfono no es válido",
              },
            })}
          />
          {errors.tel && <p className="error">{errors.tel?.message}</p>}
        </div>
      )}

      <input type="submit" className="button" value="Registrarse" />
    </form>
  );
}
