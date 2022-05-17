import React, { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { toast } from "react-toastify";

export default function BBCheckbox(props) {

    const [checked, setChecked] = useState(false)

    useEffect(() => {
        if (props.warn && props.warningsForDrug && props.warningsForDrug.length > 0) {
               let val = props.warningsForDrug.find(warns => parseInt(warns.id) === parseInt(props.warn.id))
               setChecked(val ? true : false)
        }
    }, [props])

    function addWarning() {
        fetch('/api/drugs/add-black-box-warning', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                drug_id: props.drug_id,
                black_box_warning_id: props.warn.id
            })
        })
        .then(res => {
            if (res.ok) {
                setChecked(true)
                toast.success('Linked black box warning')
            } else {
                throw new Error()
            }
        })
        .catch(() => {
            toast.error('An unexpected error occurred')
        })
    }

    function removeWarning() {
        fetch('/api/drugs/remove-black-box-warning', {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                drug_id: props.drug_id,
                black_box_warning_id: props.warn.id
            })
        })
        .then(res => {
            if (res.ok) {
                setChecked(false)
                toast.success('Unlinked black box warning')
            } else {
                throw new Error()
            }
        })
        .catch(() => {
            toast.error('An unexpected error occurred')
        })
    }

  return <Form.Check onChange={e => {
    !checked ? addWarning() : removeWarning()
  }} checked={checked}></Form.Check>;
}
