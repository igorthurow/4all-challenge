import React from 'react'

export const Widgets = (props: Props) => {
  return (
    <div className="Widgets">
      <div className="row">
        <div className="col-xl-3 col-lg-6 col-xs-12">New Orders</div>
        <div className="col-xl-3 col-lg-6 col-xs-12">Comments</div>
        <div className="col-xl-3 col-lg-6 col-xs-12">New Users</div>
        <div className="col-xl-3 col-lg-6 col-xs-12">Page Views</div>
      </div>
    </div>
  )
}

export interface Props {}