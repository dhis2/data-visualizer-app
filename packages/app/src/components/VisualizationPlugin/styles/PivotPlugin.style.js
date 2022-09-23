import css from 'styled-jsx/css'

export const pivotTableStyles = css.global`
    .pivot td {
        border: 1px solid #b2b2b2;
        padding: 5px;
    }

    .pivot-empty {
        background-color: #cddaed;
    }

    .pivot-dim {
        background-color: #dae6f8;
        text-align: center;
    }

    .pivot-dim-total {
        background-color: #bac6d8;
        text-align: center;
    }

    .pivot-value {
        background-color: #fff;
        text-align: right;
    }

    .pivot-value-total-subgrandtotal {
        background-color: #d8d8d8;
        white-space: nowrap;
        text-align: right;
    }

    .pointer {
        cursor: pointer;
    }
`
