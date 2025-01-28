import prisma from "@repo/db/prisma";
import { CreateChannelSchema } from "@repo/types/common-types";
import { Request, Response } from "express";

export async function createChannel(req: Request, res: Response) {
  try {
    const parsedData = CreateChannelSchema.safeParse(req.body);

    if (!parsedData.success) {
      throw new Error(parsedData.error.issues[0]?.message);
    }

    const existingChannel = await prisma.channel.findUnique({
      where: {
        userId: req.userId,
      },
    });

    if (existingChannel) {
      res.status(411).json({ message: "User alerady has a channel" });
      return;
    }

    // since alerady checked for existing userId it means that this slug can never have the userId or our user
    const slugTaken = await prisma.channel.findUnique({
      where: {
        slug: parsedData.data.slug,
      },
    });

    if (slugTaken) {
      res
        .status(409)
        .json({ message: "Slug alerady taken, choose another slug" });
      return;
    }

    const newChannel = await prisma.channel.create({
      data: {
        name: parsedData.data.name,
        slug: parsedData.data.slug,
        description: parsedData.data.description,
        userId: req.userId!,
      },
    });

    if (!newChannel) {
      throw new Error("Error creating new channel, please try again");
    }

    res.status(201).json({ message: "Channel created successfully" });
  } catch (e: any) {
    res.status(400).json({ message: "Validation errors", error: e.message });
    return;
  }
}

export async function getChannels(req: Request, res: Response) {
  try {
    const uniqueSlug = req.params.slug;
    if (!uniqueSlug) {
      throw new Error("No slug");
    }

    const channel = await prisma.channel.findUnique({
      where: {
        slug: uniqueSlug,
      },
      // TODO: can use select later if security concerns
      include: {
        videos: true,
      },
    });

    if (!channel) {
      res
        .status(404)
        .json({ message: "Channel not found please enter correct slug" });
      return;
    }

    res.status(200).json({
      id: channel.id,
      name: channel.name,
      description: channel.description,
      subscriber_count: channel.subscriberCount,
      videos: channel.videos,
    });
  } catch (e: any) {
    res.status(400).json({ message: "Validation errors", error: e.message });
    return;
  }
}
