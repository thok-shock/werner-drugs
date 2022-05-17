import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

function isChecked(id, sideEffects) {
  const val = sideEffects.find((sx) => parseInt(sx.id) === parseInt(id));
  return val ? true : false;
}

export default function SideEffect(props) {
  const [checked, setChecked] = useState(
    isChecked(props.id, props.side_effects)
  );

  function removeSideEffect() {
    fetch("/api/drugs/remove-side-effect", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        drug_id: props.drug_id,
        side_effect_id: props.id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error();
        }
      })
      .then((res) => {
        props.setAsOf(new Date());
        setChecked(false);
        toast.success("Unlinked side effect to drug");
      });
  }

  function addSideEffect() {
    fetch("/api/drugs/add-side-effect", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        drug_id: props.drug_id,
        side_effect_id: props.id,
      }),
    })
      .then((res) => {
        if (res.ok) {
          setChecked(true);
          toast.success("Linked side effect to drug");
        } else {
          throw new Error();
        }
      })
      .catch((err) => {
        toast.error("An unexpected error occurred");
      });
  }

  return (
    <Form.Group>
      <Form.Check
        label={props.name}
        onChange={() => {
          if (checked) {
            removeSideEffect();
          } else {
            addSideEffect();
          }
        }}
        checked={checked}
      ></Form.Check>
    </Form.Group>
  );
}
