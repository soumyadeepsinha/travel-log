import React from 'react'

const EntryForm = () => {
  return (
    <div>
      <form className="entry-form">
        <label htmlFor="apiKey">API KEY</label>
        <input type="password" name="apiKey" required autoFocus="1" />
        <label htmlFor="title">Title</label>
        <input name="title" required />
        <label htmlFor="comments">Comments</label>
        <textarea name="comments" rows={3}> </textarea>
        <label htmlFor="description">Description</label>
        <textarea name="description" rows={3}> </textarea>
        <label htmlFor="image">Image</label>
        <input name="image" />
        <label htmlFor="visitDate">Visit Date</label>
        <input name="visitDate" type="date" required />
        <button></button>
      </form>
    </div>
  )
}

export default EntryForm
