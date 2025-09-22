-- Create function to add credits to user
CREATE OR REPLACE FUNCTION add_credits(user_id UUID, credits_to_add INTEGER)
RETURNS VOID AS $$
BEGIN
    UPDATE users 
    SET credits = credits + credits_to_add,
        updated_at = NOW()
    WHERE id = user_id;
END;
$$ LANGUAGE plpgsql;
