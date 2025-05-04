import { Request, Response } from 'express';
import { prisma } from '../lib/prisma.js';
import { generateNewLink } from '../services/linkService.js';
import { z } from 'zod';

// Validate incoming URL
const urlSchema = z.object({
  url: z.string().url('Please provide a valid URL')
});

// Create a new link
export const createLink = async (req: Request, res: Response) => {
  try {
    // Validate request body
    const validationResult = urlSchema.safeParse(req.body);
    
    if (!validationResult.success) {
      return res.status(400).json({ 
        message: validationResult.error.errors[0].message 
      });
    }
    
    const { url } = validationResult.data;
    const userId = req.user?.id; // Get user ID from authenticated session
    
    // Create the original link in the database
    const link = await prisma.link.create({
      data: {
        originalUrl: url,
        userId: userId,
      },
    });
    
    // Generate a new link based on the original
    const generatedUrl = await generateNewLink(url);
    
    // Update the link with the generated URL
    const updatedLink = await prisma.link.update({
      where: { id: link.id },
      data: { generatedUrl },
    });
    
    return res.status(201).json(updatedLink);
  } catch (error) {
    console.error('Error creating link:', error);
    return res.status(500).json({ message: 'Failed to process link' });
  }
};

// Get a link by ID
export const getLinkById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;
    
    const link = await prisma.link.findUnique({
      where: { 
        id,
        userId: userId, // Only return links owned by the user
      },
    });
    
    if (!link) {
      return res.status(404).json({ message: 'Link not found' });
    }
    
    return res.status(200).json(link);
  } catch (error) {
    console.error('Error retrieving link:', error);
    return res.status(500).json({ message: 'Failed to retrieve link' });
  }
};

// Get user's link history
export const getLinkHistory = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;
    
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    
    const links = await prisma.link.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
    
    return res.status(200).json(links);
  } catch (error) {
    console.error('Error retrieving link history:', error);
    return res.status(500).json({ message: 'Failed to retrieve link history' });
  }
};