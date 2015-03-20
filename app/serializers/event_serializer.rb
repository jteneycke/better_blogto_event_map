class EventSerializer < ActiveModel::Serializer
  attributes :id, :title, :latitude, :longitude, :body, :time, :venue, :address, :website

  def time
    object.time.strftime("%l:%M %p") if object.time?
  end

end
